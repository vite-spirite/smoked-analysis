import { Storage } from "@capacitor/storage";


export class SmokeStore {

    async isMonthRegistered(date: Date): Promise<boolean> {
        const month = date.getUTCMonth()+1;
        const year = date.getUTCFullYear();

        const keys: string[] = await (await Storage.keys()).keys;

        let isFound = false;

        keys.forEach(element => {
            if(element === `${month}-${year}`) {
                isFound = true;
            }
        });

        return isFound;
    }

    private async insertNewMounth(month: number, year: number, data?: Date[]): Promise<void> {
        await Storage.set({
            key: `${(month < 10) ? ('0') : ('')}${month}-${year}`,
            value: JSON.stringify(data),
        });
    }

    async insertSmokePerMonth(month: number, year: number): Promise<void> {
        const monthResult = await this.getUTCMonthSmoke(month, year);
        if(monthResult) {
            monthResult.push(new Date());
            await this.insertNewMounth(month, year, monthResult);
        }
        else {
            await this.insertNewMounth(month, year, [new Date]);
        }
    }

    async getUTCMonthSmoke(month: number, year: number): Promise<Date[]> {
        const monthResult = await (await Storage.get({key: `${(month < 10) ? ('0') : ('')}${month}-${year}`})).value;

        if(!monthResult) {
            return [];
        }

        return JSON.parse(monthResult);
    }

    async insertSmokeStats(): Promise<void> {
        const date = new Date();
        await this.insertSmokePerMonth(date.getUTCMonth()+1, date.getUTCFullYear());
    }

    async getAllMonthSmoke() {
        let allData: ({ date: string; smoked: Date[] | null; })[] = [];

        const keys: string[] = await (await Storage.keys()).keys;

        for(const key of keys) {
            const smoking = await (await Storage.get({key})).value;
            if(smoking) {
                const smokeDate = JSON.parse(smoking) as Date[];

                allData = [
                    ...allData,
                    {
                        date: key,
                        smoked: smokeDate
                    }
                ]
            }
        }

        return allData;
    }
}