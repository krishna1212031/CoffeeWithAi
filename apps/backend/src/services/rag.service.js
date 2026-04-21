import coffeeData from "../data/coffeeData.json" assert { type: "json" };

export const searchCoffeeKnowledge = (query) =>
  coffeeData.find((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );