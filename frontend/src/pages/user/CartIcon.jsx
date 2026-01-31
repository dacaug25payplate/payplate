function CartIcon({ count, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        cursor: "pointer",
        color: "#0d6efd"
      }}
    >
      <i className="bi bi-cart3" style={{ fontSize: "26px" }}></i>

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-10px",
            background: "#dc3545",
            color: "white",
            borderRadius: "50%",
            padding: "2px 7px",
            fontSize: "12px",
            fontWeight: "bold"
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

export default CartIcon;
