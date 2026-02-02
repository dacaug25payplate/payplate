function CenterToast({ show, type, message, onClose }) {
    if (!show) return null;

    const getHeaderClass = () => {
        switch (type) {
            case "success": return "bg-success text-white";
            case "error": return "bg-danger text-white";
            case "warning": return "bg-warning text-dark";
            case "info": return "bg-info text-white";
            default: return "bg-secondary text-white";
        }
    };

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 1055 }}
        >
            <div className="card shadow-lg" style={{ width: "500px", height:"150px" }}>
                <div className={`card-header ${getHeaderClass()}`}>
                    <strong>{type.toUpperCase()}</strong>
                </div>

                <div className="card-body text-center">
                    <p className="mb-3">{message}</p>

                    <button className="btn btn-outline-secondary btn-sm" onClick={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CenterToast;