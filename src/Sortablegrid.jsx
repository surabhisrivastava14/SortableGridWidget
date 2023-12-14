import { createElement } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import useGetMachines from "./hooks/useGetMachines";
import useGetMachineHelper from "./hooks/useGetMachineHelper";
import "./ui/Sortablegrid.css";

export function Sortablegrid(props) {
    console.warn("props", props);

    if (props.machineData.status === "available") {
        const { machines, callOnSortMachines } = useGetMachines(props);
        console.warn("machines", machines);

        const { draggedMachineId, droppedOverMachineId, setDraggedMachineId, setDroppedOverMachineId } =
            useGetMachineHelper(props);

        const onSortEnd = (oldIndex, newIndex) => {
            setDraggedMachineId(machines[oldIndex].id);
            setDroppedOverMachineId(machines[newIndex].id);
            callOnSortMachines();
        };

        return (
            <div className="sortable-grid-wrapper"
                style={{
                    width: "800px",
                    margin: "auto",
                }}
            >
                <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
                    {machines
                        .sort((a, b) => a.sort - b.sort)
                        .map((machine,i) => (
                            <SortableItem key={machine.id}>
                                <div className="item">
                                    {/* {machine.name}
                                    <div>sort:{machine.sort}</div> */}
                                    <img draggable={false}
                                    src={"https://picsum.photos/"+ (200+i*50).toString()}
                                    width={"100%"}
                                    height={125}></img>
                                    <div style={{
                                        display:"flex",
                                        justifyContent:"space-between",
                                        width:"100%",
                                        marginTop:"10px"
                                    }}>
                                        <h4 className="item-name">{machine.name}</h4>
                                        <h4 className="item-sort">{machine.sort}</h4>
                                    </div>
                                    <h5 className="item-desc">{machine.description}</h5>
                                </div>
                            </SortableItem>
                        ))}
                </SortableList>
            </div>
        );
    }

    return <div>Loading...</div>;
}
