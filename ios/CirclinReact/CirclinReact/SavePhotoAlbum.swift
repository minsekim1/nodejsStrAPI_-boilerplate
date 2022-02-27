//
//  SavePhotoAlbum.swift
//  CirclinReact
//
//  Created by minsekim on 2022/02/23.
//

import Foundation
import Photos
import UIKit

class SavePhotoAlbum{
    static let albumName = "MyCloset"
    static let sharedInstance = SavePhotoAlbum()
    var assetCollection: PHAssetCollection!
    init() {
        func fetchAssetCollectionForAlbum() -> PHAssetCollection! {
            let fetchOptions = PHFetchOptions()
            fetchOptions.predicate = NSPredicate(format: "title = %@", SavePhotoAlbum.albumName)
            let collection = PHAssetCollection.fetchAssetCollections(with: .album, subtype: .any, options: fetchOptions)
            if let _: AnyObject = collection.firstObject {
                return collection.firstObject! as PHAssetCollection
            }
            return nil
        }
        if let assetCollection = fetchAssetCollectionForAlbum() {
            self.assetCollection = assetCollection
            return
        }
        PHPhotoLibrary.shared().performChanges({
            PHAssetCollectionChangeRequest.creationRequestForAssetCollection(withTitle: SavePhotoAlbum.albumName)
        }) { success, _ in
            if success {
                self.assetCollection = fetchAssetCollectionForAlbum()
            }
        }
    }

    func saveImage(img: UIImage) {
        if assetCollection == nil {
            return   // If there was an error upstream, skip the save.
        }
    
        PHPhotoLibrary.shared().performChanges({
            let assetChangeRequest = PHAssetChangeRequest.creationRequestForAsset(from: img)
            let albumChangeRequest = PHAssetCollectionChangeRequest(for: self.assetCollection)
            albumChangeRequest?.addAssets([assetChangeRequest.placeholderForCreatedAsset!] as NSArray)
        }, completionHandler: nil)
    }
    
}
