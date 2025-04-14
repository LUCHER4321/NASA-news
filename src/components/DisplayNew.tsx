import { New } from "../classes/New";

export const DisplayNew = ({myNew, hd = false}: DisplayNewProps) => {
    return(
        <>
            <h1>{myNew.title}</h1>
            <div>
            </div>
            <p className="w-full text-end">{myNew.date}</p>
            <div className="flex flex-col sm:flex-row justify-around gap-4 w-full items-start mt-4">
                <img src={hd ? myNew.hdurl : myNew.url} alt={myNew.title} className="sm:w-1/3 object-contain"/>
                <p className="text-justify">{myNew.explanation}</p>
            </div>
        </>
    )
};

interface DisplayNewProps {
    myNew: New;
    hd?: boolean;
}