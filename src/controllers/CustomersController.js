const service = require("../services/CustomersService");

async function getAllCustomers(req, res) {
  const customers = await service.getAllCustomers();
  res.json(customers);
}

async function getCustomerByEmailAddress(req, res) {
  const email = req.params.email;
  const customer = await service.getCustomerByEmailAddress(email);
  if (customer.length > 0) {
    return res.status(200).json(customer[0]);
  } else {
    return res.status(401).json({ Error: "Customer doesn't exist" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const response = await service.loginCustomer(email, password);
    const customer = response.customer;
    if (customer.isEmailVerified == false) {
      return res.status(401).json({ Error: "Email address not verified" });
    } else {
      return res.status(200).json({ Success: "Valid customer credentials" });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ Error: "Invalid credentials or account doesn't exist" });
  }
}

module.exports = {
  getAllCustomers,
  getCustomerByEmailAddress,
  login,
};
