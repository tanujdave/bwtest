const stepData = [
    {
        heading: "Step 1 - Select Your Shape",
        description: "",
        actions : {
            next: true,
            cancel: false,
            startOver: false
        }
    },
    {
        heading: "Step 2 - Insert Your Values",
        description: "You have selected a rectangle, please input the required variables",
        actions : {
            next: true,
            cancel: true,
            startOver: false
        }
    },
    {
        heading: "Step 3 - Your Results",
        description: "You have calculated the area of {AREA_NAME} to be {AREA_RESULT}. Below is your result:",
        actions : {
            next: false,
            cancel: false,
            startOver: true
        }
    },
];

export default stepData;