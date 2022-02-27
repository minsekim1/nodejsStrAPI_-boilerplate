//
//  NetworkMonitor.swift
//  CirclinReact
//
//  Created by minsekim on 2021/12/28.
//

import Foundation
import Network
import UIKit

final class NetworkMonitor{
    static let shared = NetworkMonitor()
    
    private let queue = DispatchQueue.global()
    private let monitor: NWPathMonitor
    public private(set) var isConnected:Bool = false
    public private(set) var connectionType:ConnectionType = .unknown
    
    /// 연결타입
    enum ConnectionType {
        case wifi
        case cellular
        case ethernet
        case unknown
    }
    
    private init(){
        print("init 호출")
        monitor = NWPathMonitor()
    }
    
    public func startMonitoring(){
        print("startMonitoring 호출")
        monitor.start(queue: queue)
        monitor.pathUpdateHandler = { [weak self] path in
            print("path :\(path)")

            self?.isConnected = path.status == .satisfied
            self?.getConenctionType(path)
            
            if self?.isConnected == true{
                print("연결이된 상태임!")
            }else{
                print("연결 안된 상태임!")
            }
        }
    }
    
    public func stopMonitoring(){
        print("stopMonitoring 호출")
        monitor.cancel()
    }
    
    
    private func getConenctionType(_ path:NWPath) {
        print("getConenctionType 호출")
        
        var window:UIWindow?
        if path.usesInterfaceType(.wifi){
            connectionType = .wifi
            print("wifi에 연결")

        }else if path.usesInterfaceType(.cellular) {
            connectionType = .cellular
            print("cellular에 연결")

        }else if path.usesInterfaceType(.wiredEthernet) {
            connectionType = .ethernet
            print("wiredEthernet에 연결")

        }else {
            connectionType = .unknown
            DispatchQueue.main.async {
            let viewController = UIApplication.shared.windows.first?.visibleViewController
            CommonAlert.showAlertAction1(vc: viewController, preferredStyle: .alert, title: "네트워크 없음", message: "네트워크가 연결되어 있지 않습니다. \n 앱이 정상적으로 동작하지 않을 수 있습니다.",completeTitle:"확인")
            }

            print("unknown ..")
        }
    }
}
