function DashboardStats({title, icon, value, description, colorIndex}){


    return(
        <div className="shadow bg-base-200 rounded-box p-4">
            <div className="grid">
                <div className={`stat-figure text-slate-500`}>{icon}</div>
                <div className="stat-title  text-slate-500">{title}</div>
                <div className={`stat-value text-slate-500 `}>{value}</div>
            </div>
        </div>
    )
}

export default DashboardStats