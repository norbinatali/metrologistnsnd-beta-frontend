const parallaxStyle = {
    parallax: {
        height: "80vh",
        maxHeight: "600px",
        "@media (min-width: 568px)": {
            maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
            maxWidth: "720px"
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1140px"
        },
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
            "@media (min-width: 568px)": {
            maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
            maxWidth: "720px"
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1140px"
        },
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
