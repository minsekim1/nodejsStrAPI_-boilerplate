//
//  ViewController.swift
//  WebView
//
//  Created by GUNY on 2021/10/08.
//

import UIKit
import WebKit

import Firebase
import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser
import AuthenticationServices

class CustomWebView: WKWebView {
    var accessoryView: UIView?
    override var inputAccessoryView: UIView? {
        return accessoryView
    }
}

class ViewController: UIViewController, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler,ASAuthorizationControllerDelegate {
    //앱 실행시 Apple Push Noti Service 권한을 받습니다.
    let userNotiCenter = UNUserNotificationCenter.current() // 추가
    private var observer: NSObjectProtocol?
    
    // * WKWebView 객체 선언
    
    public var wkWebView: CustomWebView? = nil
    private var config: WKWebViewConfiguration? = nil
    // * 인디케이터 선언
    private var activityIndicatorContainer: UIView!
    private var activityIndicator: UIActivityIndicatorView!
    // * 프로그레스 바 선언
    private var progressView: UIProgressView!
    // * 스테이터스바 컬러
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 실시간 네트워크 환경체크
        print("NetworkMonitor.shared",NetworkMonitor.shared.connectionType)
        if NetworkMonitor.shared.isConnected {
                 print("연결됨...")
             }else{
                 CommonAlert.showAlertAction1(vc: self, preferredStyle: .alert, title: "네트워크 없음", message: "네트워크가 연결되어 있지 않습니다.\n 앱을 종료합니다.",completeTitle:"종료", {() in exit(0)})
                 print("연결안됨...ㅜ")
             }
        
        let vc = UIViewController()
        vc.modalPresentationStyle = .fullScreen
        self.present(vc, animated: true, completion: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.detectOrientation), name: NSNotification.Name("UIDeviceOrientationDidChangeNotification"), object: nil)
        // * WKWebView JS Functions 통신을 위한 WKWebViewConfiguration 구성
        self.config = WKWebViewConfiguration.init()
        self.config?.userContentController = WKUserContentController.init()
        // * WKWebView JS -> iOS 핸들러 추가
        //    - 핸들러 이름 = 실제 호출 할 함수 이름
        self.config?.userContentController.add(self, name: "rotateAble")
        self.config?.userContentController.add(self, name: "rotateEnable")
        self.config?.userContentController.add(self, name: "rotateHorizontal")
        self.config?.userContentController.add(self, name: "rotateVertical")
        self.config?.userContentController.add(self, name: "backAble")
        self.config?.userContentController.add(self, name: "backEnable")
        self.config?.userContentController.add(self, name: "linking")
        self.config?.userContentController.add(self, name: "inChat")
        self.config?.userContentController.add(self, name: "outChat")
        self.config?.userContentController.add(self, name: "loginKakao")
        self.config?.userContentController.add(self, name: "loginApple")
        self.config?.userContentController.add(self, name: "deviceTokenUpdateToServer")
        self.config?.userContentController.add(self, name: "getNotiData")
        self.config?.userContentController.add(self, name: "resetNotiData")
        self.config?.userContentController.add(self, name: "isWifi")
        self.config?.userContentController.add(self, name: "setMessageRoomId")
        self.config?.userContentController.add(self, name: "downloadFile")
        self.config?.userContentController.add(self, name: "onNotiPush")
        // * WKWebView 구성
        //  - 여기서는 self.view 화면 전체를 WKWebView로 구성하였습니다.
        self.config?.allowsInlineMediaPlayback = true
        self.config?.mediaTypesRequiringUserActionForPlayback = []
        // Fix Fullscreen mode for video and autoplay
        self.wkWebView = CustomWebView.init(frame: CGRect.init(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height), configuration: self.config!)
//        self.wkWebView = WKWebView.init(frame: CGRect.init(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height), configuration: self.config!)
        // * WKWebView 스크롤 막기
        self.wkWebView?.scrollView.contentInsetAdjustmentBehavior = .never
        self.wkWebView?.scrollView.bounces = false;
        self.wkWebView?.scrollView.alwaysBounceHorizontal = false;
        // * WKWebView 뒤로가기, 앞으로 가기 제스처 사용 ON
        //    - Default 값은 false 입니다.
//        self.wkWebView?.allowsBackForwardNavigationGestures = true
        // webView postToReactiOS 적용
        self.wkWebView?.configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        self.wkWebView?.configuration.userContentController.add(self, name:"iosListener")
        // * WKWebView WKUIDelegate 사용설정
        self.wkWebView?.uiDelegate = self
        // * WKWebView WKNavigationDelegate 사용설정
        self.wkWebView?.navigationDelegate = self
        // * WKWebView 뒤로가기, 앞으로 가기 제스처 사용 ON
        //  - Default 값은 false 입니다.
        self.wkWebView?.allowsBackForwardNavigationGestures = true
        // * WKWebView 화면 비율 맞춤 설정
        self.wkWebView?.autoresizingMask = UIView.AutoresizingMask(rawValue: UIView.AutoresizingMask.RawValue(UInt8(UIView.AutoresizingMask.flexibleWidth.rawValue) | UInt8(UIView.AutoresizingMask.flexibleHeight.rawValue)))
        // * WKWebView 여백 및 배경 부분 색 투명하게 변경
        self.wkWebView?.backgroundColor = UIColor(red:18.0/255.0, green:18.0/255.0, blue:18.0/255.0, alpha:1)
        self.wkWebView?.isOpaque = false
        self.wkWebView?.loadHTMLString("<body style=\"background-color: 121212\">", baseURL: nil)
        
        
        ///
        // * WKWebView에 로딩할 URL 전달
        //  - 캐시 기본 정책 사용, 타임아웃은 10초로 지정하였습니다.
       let request: URLRequest = URLRequest.init(url: NSURL.init(string: "http://172.30.1.40:3000")! as URL, cachePolicy: URLRequest.CachePolicy.useProtocolCachePolicy, timeoutInterval: 10)
//         let request: URLRequest = URLRequest.init(url: NSURL.init(string: "http://172.30.1.8:3000")! as URL, cachePolicy: URLRequest.CachePolicy.useProtocolCachePolicy, timeoutInterval: 10)
        self.wkWebView?.load(request)
        // * WKWebView 화면에 표시
        self.view?.addSubview(self.wkWebView!)
        // * WKWebView Progress 퍼센트 가져오기 이벤트
        //    - addObserver로 estimatedProgress에 대한 이벤트 수신을 설정합니다.
//        self.wkWebView?.addObserver(self, forKeyPath: #keyPath(WKWebView.estimatedProgress), options: .new, context: nil)
        

        // Background TO Foregrund 체크
       observer = NotificationCenter.default.addObserver(forName: UIApplication.willEnterForegroundNotification,object: nil,queue: .main) {
           [unowned self] notification in
           // background에서 foreground로 돌아오는 경우 실행 될 코드
           print("you are foreground")
           if(appDelegate.pushNotiData != ""){
               postToReact(funcName: "getNotiData", params: appDelegate.pushNotiData)
           }
       }
    }

    
    //* 인디케이터 설정
    fileprivate func setActivityIndicator() {
        // Configure the background containerView for the indicator
        activityIndicatorContainer = UIView(frame: CGRect(x: 0, y: 0, width: 80, height: 80))
        activityIndicatorContainer.center.x = self.wkWebView!.center.x
        activityIndicatorContainer.center.y = self.wkWebView!.center.y
        activityIndicatorContainer.backgroundColor = UIColor.black
        activityIndicatorContainer.alpha = 0.8
        activityIndicatorContainer.layer.cornerRadius = 10
        // Configure the activity indicator
        activityIndicator = UIActivityIndicatorView()
        activityIndicator.hidesWhenStopped = true
        activityIndicator.style = UIActivityIndicatorView.Style.large
        activityIndicator.color = UIColor.white
        activityIndicator.translatesAutoresizingMaskIntoConstraints = false
        activityIndicatorContainer.addSubview(activityIndicator)
        self.wkWebView!.addSubview(activityIndicatorContainer)
        // Constraints
        activityIndicator.centerXAnchor.constraint(equalTo: activityIndicatorContainer.centerXAnchor).isActive = true
        activityIndicator.centerYAnchor.constraint(equalTo: activityIndicatorContainer.centerYAnchor).isActive = true
     }
    fileprivate func showActivityIndicator(show: Bool) {
        if show {
            activityIndicator.startAnimating()
        } else {
            activityIndicator.stopAnimating()
            activityIndicatorContainer.removeFromSuperview()
        }
    }
    // * 프로그레스 바 설정
//    fileprivate func setProgressBar() {
//        // 디폴트 설정
//        progressView = UIProgressView(progressViewStyle: .default)
//        progressView.center.x = self.wkWebView!.center.x
//        progressView.center.y = self.wkWebView!.center.y
//        progressView.progressTintColor = UIColor(red: 66.0/255.0, green: 165.0/255.0, blue: 245.0/255.0, alpha: 1.0)
//        progressView.trackTintColor = UIColor(red: 69.0/255.0, green: 90.0/255.0, blue: 100.0/255.0, alpha: 1.0)
//        // 코너 설정
//        progressView.clipsToBounds = true
//        progressView.layer.cornerRadius = 4
//        progressView.subviews[1].clipsToBounds = true
//        progressView.layer.sublayers![1].cornerRadius = 4// 뒤에 있는 회색 track
//        // 값 설정
//        self.wkWebView!.addSubview(progressView)
//    }
    
    // * 새창 띄울때
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        
        let loadUrl : String = navigationAction.request.url!.absoluteString
        if (loadUrl.contains("https://") || loadUrl.contains("http://")) {
            if #available(iOS 10.0,*) {
                if let aString = URL(string:(navigationAction.request.url?.absoluteString )!) {
                    UIApplication.shared.open(aString, options:[:], completionHandler: { success in
                    })
                }
            } else {
                if let aString = URL(string:(navigationAction.request.url?.absoluteString )!) {
                    UIApplication.shared.openURL(aString)
                }
            }
        } else {
            print("else")
        }
        return nil
    }
    
    // * WKWebView 자바스트립트 알럿창 띄울 때
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void)
    {
       let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
       let otherAction = UIAlertAction(title: "OK", style: .default, handler: { action in completionHandler() })
       alert.addAction(otherAction)
       self.present(alert, animated: true, completion: nil)
    }
    // * WKWebView URL Loading 시작 시 호출되는 딜리게이트 함수
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!)
    {
        print("로딩 시작")
//        self.setActivityIndicator()
//        self.showActivityIndicator(show: true)
//        self.setProgressBar()
    }
    // * WKWebView URL Loading 완료 시 호출되는 딜리게이트 함수
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!)
    {
        print("로딩 완료");
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            UIView.animate(withDuration: 0.5, animations: {self.progressView?.alpha = 0.0})
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            self.progressView?.isHidden = true
        }
    }
    // * WKWebView URL Loading 실패 시 호출되는 딜리게이트 함수
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error)

    {
        print("로딩 실패")
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            UIView.animate(withDuration: 0.5, animations: {self.progressView?.alpha = 0.0})
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            self.progressView?.isHidden = true
        }
    }
    // * WKWebView HTTPURLResponse 정보를 확인하는 딜리게이트 함수
    func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Swift.Void) {
        // * 여기서는 response.statuscode 확인 하는 예제
        if (navigationResponse.response is HTTPURLResponse) {
            let response = navigationResponse.response as? HTTPURLResponse
            print(String(format: "response.statusCode: %ld", response?.statusCode ?? 0))

        }
        // * 값에 따라 탐색 허용여부를 결정할 수 있습니다.
        decisionHandler(.allow)
    }
    // * WKWebView URL Loading 요청 시(탐색 시) 호출되는 딜리게이트 함수
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Swift.Void) {
         // * 프로토콜이 http: https: 일때만 URL 탐색 허용하며, 이외의 프로토콜일 경우 외부 브라우저를 호출하도록 구성
         if (navigationAction.request.url?.absoluteString.hasPrefix("http:"))! || (navigationAction.request.url?.absoluteString.hasPrefix("https:"))! {
             decisionHandler(.allow)
        } else {
            if #available(iOS 10.0, *) {
                if let aString = URL(string: (navigationAction.request.url?.absoluteString)!) {
                    UIApplication.shared.open(aString, options: [:], completionHandler: { success in
                        if success {
                            print("Opened \(navigationAction.request.url?.absoluteString ?? "")")
                        }
                    })
                }
            } else {
                if let aString = URL(string: (navigationAction.request.url?.absoluteString)!) {
                    UIApplication.shared.openURL(aString)
                }
            }
            // * 프로토콜이 http, https가 아니므로 탐색 허용 X
            decisionHandler(.cancel)
        }
    }
    // * WKScriptMessageHandler : 등록한 핸들러가 호출될 경우 이벤트를 수신하는 함수
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        // * message.name == 함수명, message.body == 파라미터 정보
        // * 로그인 회원가입 시 호출 함수 : user_idx 값 저장하기
        // * 함수별 로젝 처리 부분
        print("message name == \(message.name)")
        print("message body == \(message.body)")
        if (message.name == "rotateAble") {
            rotateAble()
        }
        else if(message.name == "rotateEnable")
        {
            rotateEnable()
        }
        else if(message.name == "rotateHorizontal")
        {
            rotateHorizontal(true)
        }
        else if(message.name == "rotateVertical")
        {
            rotateVertical(true)
        }
        else if(message.name == "backAble")
        {
            backAble()
        }
        else if(message.name == "backEnable")
        {
            backEnable()
        }
        else if(message.name == "linking")
        {
            openExternalLink(urlStr: "\(message.body)")
        }
          else if(message.name == "loginKakao")
        {
            // 카카오톡 설치 여부 확인
            if (UserApi.isKakaoTalkLoginAvailable()) {
                UserApi.shared.loginWithKakaoTalk {(oauthToken, error) in
                    if let error = error {
                        print(error)
                    }
                    else {
                        print("loginWithKakaoTalk() success.")
                        UserApi.shared.me { user,error in
                            self.postToReact(funcName:"loginKakaoIOS",params:"\(String(describing: oauthToken))id:\(String(describing: user?.id))email:\(String(describing: user?.kakaoAccount?.email))")
                        }
                    }
                }
            }else{
                UserApi.shared.loginWithKakaoAccount {(oauthToken, error) in
                        if let error = error {
                            print(error)
                        }
                        else {
                            print("loginWithKakaoAccount() success.")
                            UserApi.shared.me { user,error in
                                self.postToReact(funcName:"loginKakaoIOS",params:"\(String(describing: oauthToken))id:\(String(describing: user?.id))email:\(String(describing: user?.kakaoAccount?.email))")
                            }
                            
                        }
                    }
            }
            
        }
        else if(message.name == "loginApple")
        {
            let request = ASAuthorizationAppleIDProvider().createRequest()
            request.requestedScopes = [.fullName, .email]

            let controller = ASAuthorizationController(authorizationRequests: [request])
            controller.delegate = self as? ASAuthorizationControllerDelegate
            controller.presentationContextProvider = self as? ASAuthorizationControllerPresentationContextProviding
            controller.performRequests()
        }
        else if(message.name == "deviceTokenUpdateToServer")
        {
            self.postToReact(funcName:"deviceTokenUpdateToServer",params:"\(String(appDelegate.deviceToken))")
        }
        else if(message.name == "getNotiData")
        {
            self.postToReact(funcName:"getNotiData",params:"\(String(appDelegate.pushNotiData))")
        }
        else if(message.name == "resetNotiData")
        {
            appDelegate.pushNotiData="";
        }
        else if(message.name == "isWifi")
        {
            postToReact(funcName:"isWifi",params:"{\"isWifi\":\"\(NetworkMonitor.shared.connectionType == .wifi)\"}")
        }
        else if(message.name == "setMessageRoomId")
        {
            appDelegate.messageRoomId=message.body as! String;
            UNUserNotificationCenter.current().removeAllPendingNotificationRequests()
            UNUserNotificationCenter.current().removeAllDeliveredNotifications()
            UIApplication.shared.applicationIconBadgeNumber = 0
        }
        else if(message.name == "downloadFile"){
            
            guard let url = URL(string: message.body as! String)else {
                      return
                  }
                  DispatchQueue.global().async { [weak self] in
                      if let data = try? Data(contentsOf: url) {
                          if let image = UIImage(data: data) {
                              DispatchQueue.main.async {
                                  SavePhotoAlbum.sharedInstance.saveImage(img: image)
                                  
                              }
                          }
                      }
                  }
            


        }
    }
    // * 화면 전환 함수
    let appDelegate = UIApplication.shared.delegate as! AppDelegate
    var currentOrientation = "portrait"
    var storedOrientation = "portrait"
    @objc func detectOrientation() {
        if (UIDevice.current.orientation == .landscapeLeft) {
            currentOrientation = "landscapeRight"
            storedOrientation = "landscapeLeft"
            print("landscapeLeft")
        }
        else if (UIDevice.current.orientation == .landscapeRight) {
            currentOrientation = "landscapeRight"
            storedOrientation = "landscapeRight"
            print("landscapeRight")
        } else {
            currentOrientation = "portrait"
            print("portrait")
        }
    }
    func rotateAble() {
        appDelegate.shouldSupportAllOrientation = true
        if (currentOrientation != "portrait") {
            rotateHorizontal(true)
        }
    }
    func rotateEnable() {
        appDelegate.shouldSupportAllOrientation = false
        let orientation = UIInterfaceOrientation.portrait.rawValue
        UIDevice.current.setValue(orientation, forKey: "orientation")
        UINavigationController.attemptRotationToDeviceOrientation()
    }
    func rotateHorizontal(_ animated: Bool) {
        let orientation =
            storedOrientation == "landscapeLeft" ? UIInterfaceOrientation.landscapeRight.rawValue :
            storedOrientation == "landscapeRight"  ? UIInterfaceOrientation.landscapeLeft.rawValue :
            UIInterfaceOrientation.landscapeRight.rawValue
        UIDevice.current.setValue(orientation, forKey: "orientation")
        UINavigationController.attemptRotationToDeviceOrientation()
        print(storedOrientation)
    }
    func rotateVertical(_ animated: Bool) {
        let orientation = UIInterfaceOrientation.portrait.rawValue
        UIDevice.current.setValue(orientation, forKey: "orientation")
        UINavigationController.attemptRotationToDeviceOrientation()
        print(storedOrientation)
    }
    // * 뒤로가기 함수
    func backAble() {
        self.wkWebView?.allowsBackForwardNavigationGestures = true
    }
    func backEnable() {
        self.wkWebView?.allowsBackForwardNavigationGestures = false
    }
    // * ViewController 종료 시 호출되는 함수
    deinit {
        // * WKWebView Progress 퍼센트 가져오기 이벤트 제거
        self.wkWebView?.removeObserver(self, forKeyPath: #keyPath(WKWebView.estimatedProgress))
    }
    // * Observer 값이 변경되는 호출되는  observeValue 함수
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        // * 0 ~ 1 사이의 실수형으로 결과값이 출력됩니다. - 0 : 로딩 시작, 1 : 로딩 완료 - 이 함수에서 Progressbar를 구성하면 됩니다.
        print("wkWebView.estimatedProgress == \(Float((self.wkWebView?.estimatedProgress)!))")
        self.progressView?.setProgress(Float((self.wkWebView?.estimatedProgress)!), animated: true)
    }
    // * 외부 링크 함수
    func openExternalLink(urlStr: String, _ handler:(() -> Void)? = nil) {
        guard let url = URL(string: urlStr) else {
            return
        }
        
        if #available(iOS 10.0, *) {
            UIApplication.shared.open(url, options: [:]) { (result) in
                handler?()
            }
            
        } else {
            UIApplication.shared.openURL(url)
            handler?()
        }
    }
    //    postToReact
    //    React Example
    //    useEffect(() => {
    //      window.getSwiftAlert = (data:any)=>{ //<--getSwiftAlert대신에 funcName 넣으면 됨.
    //        alert(data)
    //      }})
        
    //    Swift Example
    //    self.postToReact(funcName:"loginKakaoIOS",params:"\(oauthToken)")
    public func postToReact(funcName:String,params: String) {
        print("iOS postToReact"+funcName+params)
        self.wkWebView?.evaluateJavaScript(funcName+"(\'"+params+"\')", completionHandler:nil)
    }
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        switch authorization.credential {
                case let appleIDCredential as ASAuthorizationAppleIDCredential:
                    // Create an account in your system.
                    let userIdentifier = appleIDCredential.user
                    let fullName = appleIDCredential.fullName
                    let email = appleIDCredential.email
                    
                    if  let authorizationCode = appleIDCredential.authorizationCode,
                        let identityToken = appleIDCredential.identityToken,
                        let authString = String(data: authorizationCode, encoding: .utf8),
                        let tokenString = String(data: identityToken, encoding: .utf8) {
                        print("authorizationCode: \(authorizationCode)")
                        print("identityToken: \(identityToken)")
                        print("authString: \(authString)")
                        print("tokenString: \(tokenString)")
                        let param =  "{\"authorizationCode\":\"\(authString)\",\"identityToken\":\"\(tokenString)\",\"userIdentifier\":\"\(userIdentifier)\",\"email\":\"\(email)\",\"fullName\":\"\(fullName)\"}"
                        self.postToReact(funcName:"loginAppleIOS",params:param)
                    }
                    print("useridentifier: \(userIdentifier)")
                    print("fullName: \(fullName)")
                    print("email: \(email)")
                case let passwordCredential as ASPasswordCredential:
                    // Sign in using an existing iCloud Keychain credential.
                    let username = passwordCredential.user
                    let password = passwordCredential.password
                    print("username: \(username)")
                    print("password: \(password)")
                default:
                    break
                }
        
    }
    
    // 실패 후 동작
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        print("loginApple error"+"\(error)")
    }
    
}
