import { ruleList } from "../data/ruleList.js";

const RulesPage = () => {

    return (
        <main>
            
            <div id="rules-container">
                <p>Rules:</p>
                <ul>
                    {ruleList.map((rule, index) => (
                        <li className="rule-list" key={"rule-" + index}>{rule}</li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default RulesPage;