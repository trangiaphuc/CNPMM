//
//  HuyApp.swift
//  Huy
//
//  Created by Nguyen Huy on 13/08/2022.
//

import SwiftUI

@main
struct HuyApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
