import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LabelsCountChart } from "../cmps/my-chartA";
import { LabelsPriceChart } from "../cmps/my-chartB";
import { loadToys } from "../store/toy.action"

export function HomePage() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function getChartsData() {
        const chartsData = toys.reduce(
            (acc, toy) => {
                toy.labels.forEach((label) => {
                    acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
                    acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
                })
                return acc
            },
            { labelsCountMap: {}, labelsPriceMap: {} }
        )
        Object.keys(chartsData.labelsPriceMap).forEach((label) => (chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label]))

        return chartsData
    }

    const { labelsPriceMap, labelsCountMap } = getChartsData()

    return (
        <section className="home-page">
            <h1>Welcome to MR.TOY!</h1>
            <div className="">
                <LabelsCountChart dataMap={labelsCountMap} />
                <LabelsPriceChart dataMap={labelsPriceMap} />

            </div>
        </section>
    )
}