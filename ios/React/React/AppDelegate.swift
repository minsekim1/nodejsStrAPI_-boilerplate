//
//  AppDelegate.swift
//  WVCirclin
//
//  Created by GUNY on 2021/10/15.
//

import UIKit
import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser
import Firebase
import nanopb

@main
class AppDelegate: UIResponder, UIApplicationDelegate,  UNUserNotificationCenterDelegate, MessagingDelegate,UIWindowSceneDelegate {
    var deviceToken : String = "";
    var pushNotiData :String = "";
    var messageRoomId :String = "null";
    
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // 네트워크 실시간 환경 감지
        NetworkMonitor.shared.startMonitoring()
        // 푸쉬 권한요청
        requestAuthorizationForRemotePushNotification()
        KakaoSDK.initSDK(appKey: "e4cdbc6cc87d8a0dd6982f2bc5adf1f0")
    
    
        // [START iOS APNS setting]
        // Override point for customization after application launch.
        FirebaseApp.configure()
        Messaging.messaging().delegate = self

        UNUserNotificationCenter.current().delegate = self
        let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
        UNUserNotificationCenter.current().requestAuthorization(options: authOptions) { granted, error in
            if granted {
                print("알림 등록이 완료되었습니다.")
            }
        }
        application.registerForRemoteNotifications()
        return true
    }
    // 사용자에게 푸시 권한을 요청
    func requestAuthorizationForRemotePushNotification() {
        let current = UNUserNotificationCenter.current()
        print("requestAuthorizationForRemotePushNotification:\(current)")
        current.requestAuthorization(options: [.alert, .sound, .badge]) { (granted, error) in
            // granted가 true로 떨어지면 푸시를 받을 수 있습닏.
        }
    }


    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.

    }

    var shouldSupportAllOrientation = false
    var orientationLock = UIInterfaceOrientationMask.all
    func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask{
        if (shouldSupportAllOrientation == true){
            return UIInterfaceOrientationMask.all
        }
        return UIInterfaceOrientationMask.portrait
//        return self.orientationLock
    }
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        /// 앱이 foreground  상태일 때 Push 받으면 alert를 띄워준다
        if(messageRoomId == "null") {
            completionHandler([.banner, .list, .badge, .sound])
            
//            매니저 푸쉬카운트 갱신하기
            print("asd1")
            let viewController = UIApplication.shared.windows.first!.rootViewController as! ViewController
                    viewController.postToReact(funcName:"onNotiPush",params:"")
            
        }
//        completionHandler([.alert, .sound,.badge])
      }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                  didReceive response: UNNotificationResponse,
                                  withCompletionHandler completionHandler: @escaping () -> Void) {
          let application = UIApplication.shared
          //{"type":"Option(message)","id":"Option(2051)"}
        let userInfo = response.notification.request.content.userInfo
        print(userInfo)
         let identifier = response.notification.request.identifier
        let param = "{\"type\":\"\(userInfo["type"])\",\"id\":\"\(userInfo["id"])\"}"
          
                print("userInfo:\(userInfo)")
                print("identifier:\(identifier)")
                print("userInfo type:\(String(describing: userInfo["type"]))")
                print("userInfo id:\(String(describing: userInfo["id"]))")
        UNUserNotificationCenter.current().removeAllPendingNotificationRequests()
        UNUserNotificationCenter.current().removeAllDeliveredNotifications()
        UIApplication.shared.applicationIconBadgeNumber = 0
        if application.applicationState == .active {
            //앱이 켜져있는 상태에서 푸쉬 알림을 눌렀을 때(포그라운드)
            print("푸쉬알림 탭(포그라운드)")
              let viewController = UIApplication.shared.windows.first!.rootViewController as! ViewController
                      viewController.postToReact(funcName:"getNotiData",params:param)
        }else{
            //앱이 꺼져있는 상태에서 푸쉬 알림을 눌렀을 때
  //          if application.applicationState == .inactive {
              print("푸쉬알림 탭(백그라운드 또는 종료)")
              pushNotiData = param
            let viewController = UIApplication.shared.windows.first!.rootViewController as! ViewController
                    viewController.postToReact(funcName:"getNotiData",params:param)
  //          }
        }
         
      }
    
}

struct AppUtility {
    static func lockOrientation(_ orientation: UIInterfaceOrientationMask) {
        if let delegate = UIApplication.shared.delegate as? AppDelegate {
            delegate.orientationLock = orientation
        }
    }
    /// OPTIONAL Added method to adjust lock and rotate to the desired orientation
    static func lockOrientation(_ orientation: UIInterfaceOrientationMask, andRotateTo rotateOrientation:UIInterfaceOrientation) {
        self.lockOrientation(orientation)
        UIDevice.current.setValue(rotateOrientation.rawValue, forKey: "orientation")
    }
}
extension AppDelegate {
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken firebaseDeviceToken: Data) {
        Messaging.messaging().apnsToken = firebaseDeviceToken
        deviceToken = "\(firebaseDeviceToken)"
        print( "\(firebaseDeviceToken)")
    }
}


extension AppDelegate {

    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        var window:UIWindow?
        // 이 받은 값을 서버로 보내주어야함.
        print("new FCM Token: \(String(describing: fcmToken))")
        deviceToken = "\(String(describing: fcmToken))"
//        postToReact(funcName:"deviceTokenUpdateToServer",params:"\(fcmToken)")
        if let rootViewController = window?.rootViewController as? UINavigationController {
            if let viewController = rootViewController.viewControllers.first as? ViewController {
                
                viewController.postToReact(funcName:"deviceTokenUpdateToServer",params:"\(fcmToken)")
            }
        }
  
    }
    
    
}
