import { Pet } from "src/pet/entities/pet.entity";

export const calculateMetabolicRate = (petData: Pet) => {
  const kleiber: number = 70 * Math.pow(petData.weight, 0.75);
  const metabolicRate: number = kleiber * petData.activity.factor_value * petData.condition.factor_value * petData.age;
  return metabolicRate;
}