import {useGetAllMap} from "../../src/Hooks/Index";

export const helper = () => {
    let initialData = [];
    const getAllMap =  (data)  => {
    for (const index in data) {
        const mapData =   Object.keys(data).map(dataList => ({
            id: index,
            name: data[index].name,
            isBookmark: data[index].isBookmark
        }))
        initialData.push(mapData)
    }
    }
    useGetAllMap(getAllMap);
    return initialData;
}