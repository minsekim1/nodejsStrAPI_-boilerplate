//
//  WebViewExtensions.swift
//  React
//
//  Created by minsekim on 2021/12/28.
//

import Foundation
import UIKit

// 키보드 Done 위에 표시줄 및 input 악세서리 view hide 기능
extension UIViewController {
    func removeInputAccessoryView() {
        // locate accessory view
        let windowCount = UIApplication.shared.windows.count
        if (windowCount < 2) {
            return;
        }

        let tempWindow:UIWindow = UIApplication.shared.windows[1] as UIWindow
        let accessoryView:UIView = traverseSubViews(vw: tempWindow)
        if (accessoryView.description.hasPrefix("<UIWebFormAccessory")) {
            // Found the inputAccessoryView UIView
            accessoryView.removeFromSuperview()
        }
    }

    func traverseSubViews(vw:UIView) -> UIView
    {
        if (vw.description.hasPrefix("<UIWebFormAccessory")) {
            return vw
        }

        for i in (0  ..< vw.subviews.count) {
            let subview = vw.subviews[i] as UIView;
            if (subview.subviews.count > 0) {
                let subvw = self.traverseSubViews(vw: subview)
                if (subvw.description.hasPrefix("<UIWebFormAccessory")) {
                    return subvw
                }
            }
        }
        return UIView()
    }
}
