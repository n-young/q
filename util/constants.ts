const moment = require("moment");

export const modalStyle = {
    content: {
        top: "30%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        padding: "50px 100px",
        borderRadius: "0",
        border: "1px black solid",
        transform: "translate(-50%, -50%)",
    },
};

export const nextNHours = (n: number) => {
    const endTime = moment().add(n, "h")
    const timeStops = [];
    const startTime = moment().add(15 - moment().minute() % 15, "m")
        .add(-1, "h");
    while(startTime <= endTime){
        timeStops.push(new moment(startTime));
        startTime.add(15, "m");
    }
    return timeStops;
}
