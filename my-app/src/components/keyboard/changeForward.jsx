
function ChangeForward({ setApplyToAll, applyToAll }) {

    return (
        <div>

            <button className="letter" onClick={() => setApplyToAll(a => !a)}>
                
                {applyToAll ? "🎨 שינוי כללי" : "🆕 מכאן והלאה"}

            </button>
        </div >
    );
}

export default ChangeForward;
