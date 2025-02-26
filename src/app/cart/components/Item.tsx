import React from "react";
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';


const Item: React.FC<ItemProps> = ({ id }) => {
  return (
        <div className="flex-1 lg:flex-[3]">
            <div className="flex flex-col md:flex-row justify-between mb-5">
                <div className="relative flex flex-col md:flex-row flex-[2]">
                    <img className="w-52 mx-auto md:mx-0" src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" alt="" />
                    
                    <div className="p-5 flex flex-col justify-around">
                        <span><b>Product:</b> JESSIE THUNDER SHOES</span>
                        <span><b>ID:</b> 93813718293</span>
                        <span><b>Size:</b> 37.5</span>
                    </div>

                    {/* Conteneur des boutons centré */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <Add className="hover:cursor-pointer hover:text-[#0CFF21]"/>
                        <span className="text-xl mx-1.5">2</span>
                        <Remove className="hover:cursor-pointer hover:text-[#0CFF21]"/>
                    </div>

                    <div className="p-5 flex flex-col justify-center items-center ml-auto">
                        <span className="text-2xl font-light pb-4">30€</span>
                    </div>
                </div>
            </div>
            <hr className="bg-gray-300 border-none h-px" />
        </div>
    );

};

export default Item;