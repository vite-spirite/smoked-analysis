import { App } from "@capacitor/app";
import { BackgroundTask } from "@robingenz/capacitor-background-task";
import {LocalNotifications} from '@capacitor/local-notifications'
import { SmokeStore } from "./storage";
import { injectSmokeCounter } from "@/composable/counter.composable";

App.addListener("appStateChange", async ({isActive}) => {
    if(isActive) {
        return;
    }

    await BackgroundTask.beforeExit(() => {
        LocalNotifications.registerActionTypes({
            types: [{
                id: 'add',
                actions: [
                    {
                        id: "smoke",
                        title: 'J\'ai fumée'
                    }
                ]
            }]
        });

        LocalNotifications.schedule({
            notifications: [
                {
                    id: 1,
                    title: 'SmokeCount',
                    body: 'Combien de cigarette j\'ai fumé aujourd\'hui ?',
                    actionTypeId: "add"
                }
            ]
        });
    })
});

LocalNotifications.addListener("localNotificationActionPerformed", async (notification) => {
    if(notification.actionId === "smoke") {
        //await new SmokeStore().insertSmokeStats();
        const {button} = injectSmokeCounter();
        button();
    }
});