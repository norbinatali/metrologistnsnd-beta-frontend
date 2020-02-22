const parallaxStyle = {
    parallax: {
        height: "80vh",
        maxHeight: "600px",
        width:"100%",
        justifyItems:"center",

        overflow: "hidden",
        position: "relative",
        backgroundPosition: "center center",
        marginTop:"150px",
        margin: "auto",
        padding: "0",
        border: "0",
        display: "flex",
        alignItems: "center"
    },
    filter: {
        "&:before": {
            background: "#FFFFF",

        },
        "&:after,&:before": {
            position: "absolute",

            zIndex: "1",
            width:"100%",
            height: "100%",
            left: "0",
            top: "0",
            content: "''"
        }
    },
    small: {
        height: "100vh",
        width:"100%"
    }
};

export default parallaxStyle;
