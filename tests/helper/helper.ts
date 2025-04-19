import { faker } from "@faker-js/faker";

export const userDetails = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.string.alphanumeric({ length: { min: 10, max: 10 } }),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipcode: faker.location.zipCode(),
  mobileNumber: faker.location.zipCode(),
  phoneNumber: faker.phone.number(),
};

export const creditCardDetails = {
  creditCardNumber: faker.finance.creditCardNumber(),
  creditCardCVC: faker.finance.creditCardCVV(),
  expiryMonth: faker.number.int({ min: 1, max: 12 }).toString(),
  expiryYear: faker.number.int({ min: 2025, max: 2030 }).toString(),
};
