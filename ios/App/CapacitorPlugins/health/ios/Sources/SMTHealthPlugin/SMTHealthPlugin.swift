import Foundation
import Capacitor
import HealthKit

/// SMTHealth — lee datos de actividad (Apple Watch / app Salud) vía HealthKit.
/// Solo lectura. El usuario concede permiso explícito en el diálogo del sistema.
@objc(SMTHealthPlugin)
public class SMTHealthPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SMTHealthPlugin"
    public let jsName = "SMTHealth"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestAuthorization", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getTodaySummary", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getWeeklyEnergy", returnType: CAPPluginReturnPromise)
    ]

    private let store = HKHealthStore()

    // MARK: - Disponibilidad

    @objc func isAvailable(_ call: CAPPluginCall) {
        call.resolve(["available": HKHealthStore.isHealthDataAvailable()])
    }

    private func readTypes() -> Set<HKObjectType> {
        var s = Set<HKObjectType>()
        let ids: [HKQuantityTypeIdentifier] = [
            .activeEnergyBurned, .basalEnergyBurned, .stepCount,
            .distanceWalkingRunning, .appleExerciseTime, .heartRate,
            .bodyMass, .height
        ]
        for id in ids {
            if let t = HKObjectType.quantityType(forIdentifier: id) { s.insert(t) }
        }
        s.insert(HKObjectType.workoutType())
        return s
    }

    // MARK: - Permiso

    @objc func requestAuthorization(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable() else {
            call.resolve(["granted": false, "available": false])
            return
        }
        store.requestAuthorization(toShare: nil, read: readTypes()) { success, error in
            if let e = error {
                call.reject(e.localizedDescription)
                return
            }
            call.resolve(["granted": success, "available": true])
        }
    }

    // MARK: - Helpers de consulta

    private func startOfToday() -> Date {
        Calendar.current.startOfDay(for: Date())
    }

    private func sumToday(_ id: HKQuantityTypeIdentifier, unit: HKUnit, completion: @escaping (Double) -> Void) {
        guard let type = HKQuantityType.quantityType(forIdentifier: id) else { completion(0); return }
        let pred = HKQuery.predicateForSamples(withStart: startOfToday(), end: Date(), options: .strictStartDate)
        let q = HKStatisticsQuery(quantityType: type, quantitySamplePredicate: pred, options: .cumulativeSum) { _, res, _ in
            completion(res?.sumQuantity()?.doubleValue(for: unit) ?? 0)
        }
        store.execute(q)
    }

    private func avgToday(_ id: HKQuantityTypeIdentifier, unit: HKUnit, completion: @escaping (Double) -> Void) {
        guard let type = HKQuantityType.quantityType(forIdentifier: id) else { completion(0); return }
        let pred = HKQuery.predicateForSamples(withStart: startOfToday(), end: Date(), options: .strictStartDate)
        let q = HKStatisticsQuery(quantityType: type, quantitySamplePredicate: pred, options: .discreteAverage) { _, res, _ in
            completion(res?.averageQuantity()?.doubleValue(for: unit) ?? 0)
        }
        store.execute(q)
    }

    private func latest(_ id: HKQuantityTypeIdentifier, unit: HKUnit, completion: @escaping (Double) -> Void) {
        guard let type = HKQuantityType.quantityType(forIdentifier: id) else { completion(0); return }
        let sort = NSSortDescriptor(key: HKSampleSortIdentifierEndDate, ascending: false)
        let q = HKSampleQuery(sampleType: type, predicate: nil, limit: 1, sortDescriptors: [sort]) { _, samples, _ in
            let v = (samples?.first as? HKQuantitySample)?.quantity.doubleValue(for: unit) ?? 0
            completion(v)
        }
        store.execute(q)
    }

    // MARK: - Resumen de hoy

    @objc func getTodaySummary(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable() else {
            call.resolve(["available": false])
            return
        }
        let group = DispatchGroup()
        var out: [String: Any] = ["available": true]
        let round1 = { (v: Double) -> Double in (v * 10).rounded() / 10 }

        group.enter(); sumToday(.activeEnergyBurned, unit: .kilocalorie()) { out["activeEnergy"] = Int($0.rounded()); group.leave() }
        group.enter(); sumToday(.basalEnergyBurned, unit: .kilocalorie()) { out["restingEnergy"] = Int($0.rounded()); group.leave() }
        group.enter(); sumToday(.stepCount, unit: .count()) { out["steps"] = Int($0.rounded()); group.leave() }
        group.enter(); sumToday(.distanceWalkingRunning, unit: .meter()) { out["distanceKm"] = round1($0 / 1000.0); group.leave() }
        group.enter(); sumToday(.appleExerciseTime, unit: .minute()) { out["exerciseMinutes"] = Int($0.rounded()); group.leave() }
        group.enter(); avgToday(.heartRate, unit: HKUnit.count().unitDivided(by: .minute())) { out["heartRateAvg"] = Int($0.rounded()); group.leave() }
        group.enter(); latest(.bodyMass, unit: .gramUnit(with: .kilo)) { v in if v > 0 { out["weight"] = round1(v) }; group.leave() }
        group.enter(); latest(.height, unit: .meterUnit(with: .centi)) { v in if v > 0 { out["height"] = Int(v.rounded()) }; group.leave() }

        group.notify(queue: .main) { call.resolve(out) }
    }

    // MARK: - Energía activa de los últimos 7 días

    @objc func getWeeklyEnergy(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable(),
              let type = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned) else {
            call.resolve(["days": []])
            return
        }
        let cal = Calendar.current
        let end = Date()
        let anchor = cal.date(byAdding: .day, value: -6, to: cal.startOfDay(for: end)) ?? cal.startOfDay(for: end)
        var interval = DateComponents(); interval.day = 1

        let q = HKStatisticsCollectionQuery(
            quantityType: type,
            quantitySamplePredicate: nil,
            options: .cumulativeSum,
            anchorDate: anchor,
            intervalComponents: interval
        )
        q.initialResultsHandler = { _, results, _ in
            var arr: [[String: Any]] = []
            let df = DateFormatter(); df.dateFormat = "yyyy-MM-dd"
            results?.enumerateStatistics(from: anchor, to: end) { stat, _ in
                let v = stat.sumQuantity()?.doubleValue(for: .kilocalorie()) ?? 0
                arr.append(["date": df.string(from: stat.startDate), "kcal": Int(v.rounded())])
            }
            DispatchQueue.main.async { call.resolve(["days": arr]) }
        }
        store.execute(q)
    }
}
