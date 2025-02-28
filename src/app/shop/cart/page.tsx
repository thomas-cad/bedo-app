import Item from "./components/Item"

const Cart = () => {
  return (
    <div className="p-5 mt-24">
      <div className="font-light text-center text-3xl pb-10">VOTRE PANIER</div>
      <div className="flex flex-col lg:flex-row justify-between">
        <Item />
        <div className="flex-1 border border-gray-300 rounded-lg p-5 h-64 mt-5 lg:mt-0 lg:ml-5">
          <h1 className="font-light">RESUME DE LA COMMANDE</h1>
          <div className="flex justify-between my-5 font-semibold text-xl">
            <span>Total</span>
            <span>30 €</span>
          </div>
          <button className="w-full p-2.5 bg-black text-white font-bold">COMMANDER</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;