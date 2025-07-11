function CardLayout({ children }) {
    return (
        <>
            <div className="CardLayoutBorder">
            </div>
            <div className="CardLayoutInner">
                {children}
            </div>
        </>
    )
}

export default CardLayout
