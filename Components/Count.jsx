import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import { style } from 'd3';
import { Border } from 'victory';
import './Dash.css'
import App1 from './DasBoard/data1';
import Ord from '../assets/o1.webp'
import pay from '../assets/pay.png'
import nopay from '../assets/nopay.webp'
import LineGraph from './DasBoard/LineGraph';



const Count = () => {
    const [data, setData] = useState(null);
    const [Smdata, setSmdata] = useState([])
    const [ThisMonthCount, setThisMonthCount] = useState([])
    const [TodayDate, setTodayDate] = useState(null)
    const [Last30thDay, setLast30thDay] = useState(null)
    const [From30ThDayCount, SetFrom30ThDayCount] = useState(null)
    const [Last30DaysAmount, SetAmount] = useState(0)
    const [From30DaysAmount, SetAmount2] = useState(0)
    const [CountPer, SetPerCount] = useState('')
    const [PricePer, SetPerPrice] = useState('')
    const [Last30DaysPaidCount, SetLastPaidCount] = useState(0)
    const [From30DaysPaidCount, SetFromPaidCount] = useState(0)
    const [Last30DaysUnPaidCount, SetLastUnPaidCount] = useState(0)
    const [From30DaysUnPaidCount, SetFromUnPaidCount] = useState(0)
    const [PaidPer, SetPerPaid] = useState('')
    const [UnPaidPer, SetUnPerPaid] = useState('')
    const [Last30DaysCustamerCount, SetLastCustamerCount] = useState(0)
    const [From30DaysCustamerCount, SetFromCustamerCount] = useState(0)
    const [TotalCustamerCount, SetTotalCustamerCount] = useState(0)
    const [CustamerPer, SetCustamerPer] = useState(null)
    const [TodayMoney, SetTodayMoney] = useState(0)
    const [TotalMoney, SetTotalMoney] = useState(0)
    const [DateMoney, SetDateMoney] = useState([])
    const [DateMoney2, SetDateMoney2] = useState([])
    const [Give1, SetGive1] = useState(false)
    const [Give2, SetGive2] = useState(false)
    const [Data, SetData] = useState([])
    const [Data2, SetData2] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get("http://127.0.0.1:8000/LCODetails/");
              
                const FilterData = response.data.filter((e) => {
                    return e.Order_Id.username === Number(localStorage.getItem('id'));
                });
                
                const daysCount = {};
                let Count = 0
                let SellingPrice = 0
                let Paid = 0
                let UnPaid = 0
                const Normaldata = []
              
                FilterData.forEach((e) => {
                    const orderDate = new Date(e.Order_Id.Date);
                   
                    if (new Date().toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Normaldata.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })
                        Count += 1
                        SellingPrice += Number(e.Total_Amount)
                        daysCount[orderDate.toLocaleDateString()]++;
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {

                            Paid += 1
                        } else {
                            UnPaid += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Normaldata.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })
                        Count += 1
                        SellingPrice += Number(e.Total_Amount)
                        daysCount[orderDate.toLocaleDateString()]++;
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {

                            Paid += 1
                        } else {
                            UnPaid += 1
                        }

                    } else if (new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Normaldata.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })
                        Count += 1
                        SellingPrice += Number(e.Total_Amount)
                        daysCount[orderDate.toLocaleDateString()]++;
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {

                            Paid += 1
                        } else {
                            UnPaid += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Normaldata.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })
                        Count += 1
                        SellingPrice += Number(e.Total_Amount)

                        daysCount[orderDate.toLocaleDateString()]++;
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {

                            Paid += 1
                        } else {
                            UnPaid += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 4)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Normaldata.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })
                        Count += 1
                        SellingPrice += Number(e.Total_Amount)
                        daysCount[orderDate.toLocaleDateString()]++;
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {

                            Paid += 1
                        } else {
                            UnPaid += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 5)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Normaldata.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })
                        Count += 1
                        SellingPrice += Number(e.Total_Amount)
                        daysCount[orderDate.toLocaleDateString()]++;
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {

                            Paid += 1
                        } else {
                            UnPaid += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 6)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Normaldata.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })
                        Count += 1
                        SellingPrice += Number(e.Total_Amount)
                        daysCount[orderDate.toLocaleDateString()]++;
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {

                            Paid += 1
                        } else {
                            UnPaid += 1
                        }
                    }

                });
              
                SetDateMoney(Normaldata)
                setData(Count)
                SetAmount(SellingPrice)
                const thirtyDaysAgo = new Date();
                setTodayDate(thirtyDaysAgo.toDateString().slice(3, 10))
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 6);
                setLast30thDay(thirtyDaysAgo.toDateString().slice(3, 10))

                let Count2 = 0
                let SellingPrice2 = 0
                let Paid2 = 0
                let UnPaid2 = 0
                let MoneyData2 = []
                FilterData.forEach((e) => {
                    const orderDate = new Date(e.Order_Id.Date);
                    if (new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Count2 += 1

                        MoneyData2.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })

                        SellingPrice2 += Number(e.Total_Amount)
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {
                            Paid2 += 1
                        } else {
                            UnPaid2 += 1
                        }

                    } else if (new Date(new Date().setDate(new Date().getDate() - 8)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Count2 += 1

                        MoneyData2.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })

                        SellingPrice2 += Number(e.Total_Amount)
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {
                            Paid2 += 1
                        } else {
                            UnPaid2 += 1
                        }

                    } else if (new Date(new Date().setDate(new Date().getDate() - 9)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Count2 += 1

                        MoneyData2.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })

                        SellingPrice2 += Number(e.Total_Amount)
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {
                            Paid2 += 1
                        } else {
                            UnPaid2 += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 10)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {

                        Count2 += 1

                        MoneyData2.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })

                        SellingPrice2 += Number(e.Total_Amount)
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {
                            Paid2 += 1
                        } else {
                            UnPaid2 += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 11)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Count2 += 1

                        MoneyData2.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })

                        SellingPrice2 += Number(e.Total_Amount)
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {
                            Paid2 += 1
                        } else {
                            UnPaid2 += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 12)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Count2 += 1

                        MoneyData2.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })

                        SellingPrice2 += Number(e.Total_Amount)
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {
                            Paid2 += 1
                        } else {
                            UnPaid2 += 1
                        }
                    } else if (new Date(new Date().setDate(new Date().getDate() - 13)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
                        Count2 += 1

                        MoneyData2.push({
                            'date': orderDate.toLocaleDateString(),
                            "SellingPrice": e.Total_Amount
                        })

                        SellingPrice2 += Number(e.Total_Amount)
                        if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {
                            Paid2 += 1
                        } else {
                            UnPaid2 += 1
                        }
                    }

                });
             
                SetDateMoney2(MoneyData2)
                SetFrom30ThDayCount(Count2)
                SetAmount2(SellingPrice2)







                // FilterData.forEach((e) => {

                //     const orderDate = new Date(e.Order_Id.Date);
                //     const currentDate = new Date();
                //     if (
                //         orderDate >= thirtyDaysAgo &&
                //         orderDate <= currentDate &&
                //         e.Order_Id.OrderCancel === 'No'
                //     ) {
                //         console.log(e)
                //         
                //         daysCount[orderDate.toLocaleDateString()]++;
                //         Count += 1
                //         SellingPrice += Number(e.Total_Amount)
                //         if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {

                //             Paid += 1
                //         } else {
                //             UnPaid += 1
                //         }

                //     }
                // });







                // const sixtyDaysAgo = new Date();
                // sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 14)


                // FilterData.forEach((e) => {

                //     const orderDate = new Date(e.Order_Id.Date)
                //     if (orderDate.toDateString() >= thirtyDaysAgo.toDateString() && orderDate.toDateString() <= sixtyDaysAgo.toDateString() && e.Order_Id.OrderCancel === 'No') {
                //         Count2 += 1

                //         MoneyData2.push({
                //             'date': orderDate.toLocaleDateString(),
                //             "SellingPrice": e.Total_Amount
                //         })

                //         SellingPrice2 += Number(e.Total_Amount)
                //         if (e.Order_Id.Payment_Status.toLowerCase().includes('Comp'.toLowerCase())) {
                //             Paid2 += 1
                //         } else {
                //             UnPaid2 += 1
                //         }
                //     }
                // })



                if (Count2 == 0 && Count > 0) {

                    SetPerCount('100%')
                } else if (Count2 == 0 && Count == 0) {
                    SetPerCount('0%')
                } else {
                    if (Count == 0 && Count2 > 0) {
                        SetPerCount('-100%')
                    }
                    else {
                        const Diff = Count - Count2
                        const Per = Math.trunc((Diff / Count2) * 100)
                        SetPerCount(`${String(Per)}%`)


                    }
                }

                if (SellingPrice2 == 0 && SellingPrice > 0) {
                    SetPerPrice('100%')
                }
                else if (SellingPrice == 0 && SellingPrice2 == 0) {
                    SetPerPrice('0%')
                }
                else {
                    if (SellingPrice == 0 > 0 && SellingPrice2 > 0) {
                        SetPerPrice('-100%')
                    } else {
                        const Diff = SellingPrice - SellingPrice2
                        const Per = Math.trunc((Diff / SellingPrice2) * 100)
                        SetPerPrice(`${String(Per)}%`)
                    }
                }

                SetLastPaidCount(Paid)
                SetFromPaidCount(Paid2)
              
                SetLastUnPaidCount(UnPaid)
                SetFromUnPaidCount(UnPaid2)

                if (Paid2 == 0 && Paid > 0) {
                    SetPerPaid('100%')
                } else if (Paid2 == 0 && Paid == 0 || Paid2 === Paid) {
                    SetPerPaid(String('0%'))

                } else {
                    if (Paid2 > 0 && Paid == 0) {
                        SetPerPaid('-100%')
                    } else {
                        const Diff = Paid - Paid2


                        const Per = Math.trunc((Diff / Paid2) * 100)
                        SetPerPaid(`${String(Per)}%`)



                    }
                }
                if (UnPaid2 == 0 && UnPaid > 0) {
                    SetUnPerPaid('100%')
                } else if (UnPaid2 == 0 && UnPaid == 0) {
                    SetUnPerPaid('0%')
                } else {
                    if (UnPaid2 > 0 && UnPaid == 0) {
                        SetUnPerPaid('-100%')
                    } else {
                        const Diff = UnPaid - UnPaid2
                        const Per = Math.trunc((Diff / UnPaid2) * 100)
                        SetUnPerPaid(`${String(Per)}%`)
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        MoneyCount();
        fetchData();
        CustamerCount();

    }, []);
    const CustamerCount = () => {
        axios.get('http://127.0.0.1:8000/LoginDetails/').then((d) => {
            SetTotalCustamerCount(d.data.length)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const sixtyDaysAgo = new Date();
            sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)
            let Count = 0
            let Count2 = 0
            const FilterData = d.data
            FilterData.forEach((e) => {
                const jondate = new Date(e.JoinDate)
                const currentDate = new Date()
                if (jondate >= thirtyDaysAgo &&
                    jondate <= currentDate) {
                    Count += 1
                } else if (jondate <= thirtyDaysAgo && jondate >= sixtyDaysAgo) {
                    Count2 += 1
                }

            })
            SetLastCustamerCount(Count)
            SetFromCustamerCount(Count2)
            if (Count2 == 0 && Count > 0) {

                SetCustamerPer('100%')
            } else if (Count2 == 0 && Count == 0) {

                SetCustamerPer('0%')
            } else {
                if (Count == 0 && Count2 > 0) {

                    SetCustamerPer('-100%')
                }
                else {

                    const Diff = Count - Count2
                    const Per = Math.trunc((Diff / Count2) * 100)
                    SetCustamerPer(`${Per >= 100 ? '+' : ''} ${String(Per)}%`)
                }
            }


        })
    }
    const MoneyCount = () => {
        axios.get("http://127.0.0.1:8000/LCODetails/")
            .then((response) => {
                let TodayMoney = 0;
                let TotalMoney = 0;
                const TDate = new Date().toDateString();

                response.data.forEach((e) => {
                    const ODate = new Date(e.Order_Id.Date).toDateString();
                    console.log(e)
                    if (ODate === TDate && e.Order_Id.OrderCancel === 'No') {
                        TodayMoney += Number(e.Total_Amount);
                       
                    }

                    if (e.Order_Id.OrderCancel === 'No') {
                        TotalMoney += Number(e.Total_Amount);
                    }
                });

                SetTodayMoney(TodayMoney);
                SetTotalMoney(TotalMoney)

            })
            .catch((error) => {

                console.error('Error fetching data:', error);
            });
    };
    useEffect(() => {
        let td = 0
        let td2 = 0
        let td3 = 0
        let td4 = 0
        let td5 = 0
        let td6 = 0
        let td7 = 0
        DateMoney.map((e) => {
            if (new Date().getFullYear() === new Date(e.date).getFullYear() && new Date(e.date).getDate() == new Date().getDate() && new Date(e.date).getMonth() === new Date().getMonth()) {
                td += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td2 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td3 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td4 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (4 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td5 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td6 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (6 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td7 += Number(e.SellingPrice)


            }
        })
        const data10 = [
            {
                x: `${new Date().toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td
            },
            {
                x: `${new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (8 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td2
            },
            {
                x: `${new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (9 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td3
            },
            {
                x: `${new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (10 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td4
            },
            {
                x: `${new Date(new Date().getTime() - (4 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (11 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td5
            },
            {
                x: `${new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (12 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td6
            },
            {
                x: `${new Date(new Date().getTime() - (6 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (13 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td7
            },
        ]
        SetData(data10)




    }, [DateMoney])
    useEffect(() => {
        let td8 = 0
        let td9 = 0
        let td10 = 0
        let td11 = 0
        let td12 = 0
        let td13 = 0
        let td14 = 0
        DateMoney2.map((e) => {
            if (new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td8 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (8 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td9 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (9 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td10 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (10 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td11 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (11 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td12 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (12 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td13 += Number(e.SellingPrice)

            }
            else if (new Date(new Date().getTime() - (13 * 24 * 60 * 60 * 1000)).toLocaleDateString() === new Date(e.date).toLocaleDateString()) {
                td14 += Number(e.SellingPrice)

            }
        })

        const data11 = [
            {
                x: `${new Date().toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td8
            },
            {
                x: `${new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (8 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td9
            },
            {
                x: `${new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (9 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td10
            },
            {
                x: `${new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (10 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td11
            },
            {
                x: `${new Date(new Date().getTime() - (4 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (11 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td12
            },
            {
                x: `${new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (12 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td13
            },
            {
                x: `${new Date(new Date().getTime() - (6 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)} \n ${new Date(new Date().getTime() - (13 * 24 * 60 * 60 * 1000)).toDateString().slice(3, 10)}`,
                y: td14
            },
        ]
        SetData2(data11)

    }, [DateMoney2])





    return (
        <>

            <div className='mt-2 d-flex flex-column shadow-sm d-lg-flex flex-lg-row   ' style={{ background: '', boxShadow: '0px 0px 10px 10px lightgray' }}>
                <div className=' col-lg-6 '>
                    {Data && Data2 && <>

                        <App1 data={Data} data2={Data2} />

                    </>}
                </div>
                <div className='col-lg-6 d-flex flex-column    p-4 mt-2  ' >
                    <div className='d-flex flex-column d-sm-flex flex-sm-row mt-3'>
                        <div className=' col-sm-6 mb-2 mr-2 card p-2 mt-auto  ' style={{ height: '150px', background: '#F0896F', position: 'relative' }} >
                            <span className=' htext '>Last 7 Day's Orders</span>
                            <h6 className='text-white'>{data && data}</h6>
                            <div class="progress" style={{height:'7px' }}>
                                {CountPer.includes('-') ? <><div class="progress-bar bg-danger" role="progressbar" style={{ width: `${CountPer.slice(1, CountPer.length)}` }} aria-valuenow="10" aria-valuemin="20" aria-valuemax="100"></div></> : <>
                                    <div class="progress-bar" role="progressbar" style={{ width: `${CountPer}` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div></>}
                            </div>
                            <small className='text-white'>{CountPer} {CountPer.includes('-') ? 'decrease' : 'increase'}</small>
                            <small className='text-white'>Compare to last week</small>
                            <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '2px', right: '2px' }}>
                                <div className='p-3 card rounded-circle d-flex flex-row justify-content-center ' style={{ fontSize: '20px', boxShadow: `0px 0px 10px 2px ${CountPer.includes('-')?'red':'#1CB185' }`   , width: '57px' }}>

                                    {CountPer.includes('-') ? <><i class="fa-solid fa-arrow-down-short-wide" style={{color:'red'}}></i></> : <><i class="fa-solid fa-arrow-up-wide-short" style={{color:'blue'}}></i></>}
                                </div>

                            </div>

                        </div>
                        <div className='col-sm-6 mb-2 card p-2 mt-auto     ' style={{ height: '150px', background: '#8E4FF5', position: 'relative' }} >
                            <span className=' htext'>Last 7 Day's paid Orders</span>
                            <h6 className='text-white'>{Last30DaysPaidCount && Last30DaysPaidCount}</h6>
                            <div class="progress" style={{height:'7px' }}>
                              {PaidPer && PaidPer.includes('-') ? <><div class="progress-bar bg-danger" role="progressbar" style={{ width: `${PaidPer.slice(1, PaidPer.length)}` }} aria-valuenow="10" aria-valuemin="20" aria-valuemax="100"></div></> : <>
                                <div class="progress-bar" role="progressbar" style={{ width: `${PaidPer}` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div></>}
                            </div>
                            <small className='text-white'>{PaidPer} {PaidPer.includes('-') ? 'decrease' : 'increase'}</small>
                            <small className='text-white'>Compare to last week</small>
                            <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '2px', right: '2px' }}>
                                <div className='p-3 card rounded-circle d-flex flex-row justify-content-center ' style={{ fontSize: '20px', boxShadow: `0px 0px 10px 2px ${PaidPer.includes('-')?'red':'#1CB185' }`, width: '57px' }}>

                                    {PaidPer.includes('-') ? <><i class="fa-solid fa-arrow-trend-down" style={{color:'red'}}> </i></> : <> <i class="fa-solid fa-arrow-trend-up" style={{color:'blue'}}></i></>}
                                </div>

                             </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column d-sm-flex flex-sm-row mt-5'>
                    <div className='col-sm-6 mb-2 mr-2 card p-2 mt-auto   ' style={{ height: '150px', background: '#1CB185', position: 'relative' }} >
                        <span className=' htext'>Last 7 Day's Unpaid Orders</span>
                        <h6 className='text-white'>{Last30DaysUnPaidCount && Last30DaysUnPaidCount}</h6>
                        <div class="progress" style={{height:'7px' }}>
                            {UnPaidPer && UnPaidPer.includes('-') ? <><div class="progress-bar bg-danger" role="progressbar" style={{ width: `${UnPaidPer.slice(1, UnPaidPer.length)}` }} aria-valuenow="10" aria-valuemin="20" aria-valuemax="100"></div></> : <>
                                <div class="progress-bar" role="progressbar" style={{ width: `${UnPaidPer}` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div></>}
                        </div>
                        <small className='text-white'>{UnPaidPer} {UnPaidPer.includes('-') ? 'decrease' : 'increase'}</small>
                        <small className='text-white'>Compare to last week</small>
                        <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '2px', right: '2px' }}>
                            <div className='p-3 card rounded-circle d-flex flex-row justify-content-center ' style={{ fontSize: '20px', boxShadow:`0px 0px 10px 2px ${UnPaidPer.includes('-')?'red':'#1CB185' }`, width: '57px' }}>
                              
                                {UnPaidPer.includes('-') ?<><i class="fa-solid fa-angles-down" style={{color:'red'}}></i></> : <><i class="fa-solid fa-angles-up" style={{color:'blue'}}></i></>}
                            </div>

                        </div>
                    </div>
                    <div className='col-sm-6  mb-2 card mt-auto ' style={{ height: '150px', background: '#47277A', position: 'relative' }} >
                        <span className=' htext mt-1'>Last 7 Day's Revenue</span>
                        <h6 className='text-white'><i class="fa-solid fa-indian-rupee-sign text-white mr-1 "></i>{Last30DaysAmount && Last30DaysAmount}</h6>
                        <div class="progress" style={{height:'7px' }}>
                            {PricePer && PricePer.includes('-') ? <><div class="progress-bar bg-danger" role="progressbar" style={{ width: `${PricePer.slice(1, PricePer.length)}` }} aria-valuenow="10" aria-valuemin="20" aria-valuemax="100"></div></> : <>
                                <div class="progress-bar" role="progressbar" style={{ width: `${PricePer}` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div></>}
                        </div>
                        <small className='text-white'>{PricePer} {PricePer.includes('-') ? 'decrease' : 'increase'}</small>
                        <small className='text-white'>Compare to last week</small>
                        <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '2px', right: '2px' }}>
                            <div className='p-3 card rounded-circle d-flex flex-row justify-content-center ' style={{ fontSize: '20px', boxShadow: `0px 0px 10px 2px ${PricePer.includes('-')?'red':'#1CB185' }`, width: '57px' }}>
                                
                                {PricePer.includes('-') ? <><i class="fa-solid fa-angle-down" style={{color:'red'}}></i></> :<><i class="fa-solid fa-money-bill-trend-up" style={{color:'blue'}}></i></> }
                            </div>

                        </div>
                    </div>
                    </div>

                </div>

            </div>
            {/*  */}
            <div className='shadow-lg'>
            <div className='d-flex flex-column d-sm-flex flex-sm-row  p-4  ' style={{overflow:'hidden'}} >
                <div className='col-sm-6 col-md-3 col-lg-3 mb-2 p-2  bg1  ' style={{ height: '100px', position: 'relative', }} >
                    <small className=' smtext'>Today Revenue</small>
                    <h6 className='text-dark'><i class="fa-solid fa-indian-rupee-sign text-dark mr-1 "></i>{TodayMoney && TodayMoney}</h6>

                    <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '7px', right: '10px' }}>
                        <div className='p-3 card rounded-circle d-flex flex-row justify-content-center ' style={{ fontSize: '20px', boxShadow: '0px 0px 10px 2px deepskyblue', width: '50px',backgroundColor:'' }}>
                            <i class="fa-solid fa-coins text-warning"></i>
                        </div>

                    </div>

                </div>
                <div className='col-sm-6 col-md-3 col-lg-3 mb-2 p-2 ml-1 bg1 ' style={{ height: '100px', position: 'relative' }} >
                    <small className='smtext '>Total Revenuve</small>
                    <h6 className='text-dark'><i class="fa-solid fa-indian-rupee-sign text-dark mr-1 "></i>{TotalMoney && TotalMoney}</h6>

                    <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '7px', right: '10px', }}>
                        <div className='p-3 card rounded-circle d-flex flex-row justify-content-center' style={{ fontSize: '20px', boxShadow: '0px 0px 10px 2px #8E4FF5 ', width: '50px' }}>
                            <i class="fa-solid fa-indian-rupee-sign text-success "></i>
                        </div>

                    </div>

                </div>
                <div className='d-none d-md-block col-sm-5 col-md-3 col-lg-3 mb-2 ml-1 p-2 bg1  ' style={{ height: '100px', position: 'relative', }} >
                    <small className='smtext '>Total Customers</small>
                    <h6 className='text-dark'>{TotalCustamerCount && TotalCustamerCount}</h6>
                    <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '7px', right: '10px' }}>
                        <div className='p-3 card rounded-circle d-flex flex-row justify-content-center' style={{ fontSize: '20px', boxShadow: '0px 0px 10px 2px #47277A ', width: '50px' }}>
                            <i class="fa-solid fa-users text-info"></i>
                        </div>

                    </div>
                </div>
                <div className='d-none d-md-block col-sm-6 col-md-3 col-lg-3 ml-1 mb-2p-2 bg1 ' style={{ height: '100px', position: 'relative' }} >
                    <small className='smtext '>Last 30 Day's New Custamers </small>
                    <h6 className='text-dark'>{Last30DaysCustamerCount && Last30DaysCustamerCount}</h6>
                    <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '7px', right: '10px' }}>
                        <div className='p-3 card rounded-circle d-flex flex-row justify-content-center' style={{ fontSize: '20px', boxShadow: '0px 0px 10px 2px #F0896F', width: '50px' }}>
                            <i class="fa-regular fa-user text-primary"></i>
                        </div>

                    </div>

                </div>
            </div>
            <div className=' d-flex flex-column d-sm-flex flex-sm-row  p-4 bg1 ' >
                <div className='d-block d-md-none col-sm-6 col-md-3 col-lg-3 mb-2 p-2  ' style={{ height: '100px', position: 'relative' }} >
                    <small className='smtext '>Total Customers</small>
                    <h6 className='text-dark'>{TotalCustamerCount && TotalCustamerCount}</h6>
                    <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '7px', right: '10px' }}>
                        <div className='p-3 card rounded-circle d-flex flex-row justify-content-center' style={{ fontSize: '20px', boxShadow: '0px 0px 10px 0px #47277A ', width: '50px' }}>
                            <i class="fa-solid fa-users text-info"></i>
                        </div>

                    </div>
                </div>
                <div className='d-block d-md-none col-sm-6 col-md-3 col-lg-3 ml-1 mb-2  p-2 bg1  ' style={{ height: '100px', position: 'relative' }} >
                    <small className='smtext'>Last 30 Day's New Custamers </small>
                    <h6 className='text-dark'>{Last30DaysCustamerCount && Last30DaysCustamerCount}</h6>
                    <div className='d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '7px', right: '10px', }}>
                        <div className='p-3 card rounded-circle d-flex flex-row justify-content-center' style={{ fontSize: '20px', boxShadow: '0px 0px 10px 0px #F0896F', width: '50px' }}>
                            <i class="fa-regular fa-user text-primary"></i>
                        </div>

                    </div>
                </div>
            </div>
            </div>



        </>
    )
}
export default Count
