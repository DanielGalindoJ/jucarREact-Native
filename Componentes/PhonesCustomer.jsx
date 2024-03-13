import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";

const CustomersPhones = ({ route, navigation }) => {
  const { customerId } = route.params;
  const [customersPhone, setCustomersPhone] = useState([]);
  const [newCustomerPhone, setNewCustomerPhone] = useState({
    PhoneType: "",
    PhoneNumber: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [selectedCustomerPhoneId, setSelectedCustomerPhoneId] = useState(null);

  useEffect(() => {
    const fetchCustomersPhone = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/customers/${customerId}/phones`
        );
        setCustomersPhone(response.data);
      } catch (error) {
        console.error("Error fetching customers phone", error);
      }
    };
    fetchCustomersPhone();
  }, [customerId]);

  const handleCreateCustomerPhone = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/customers/${customerId}/phones`,
        newCustomerPhone
      );
      setCustomersPhone([...customersPhone, response.data]);
      setNewCustomerPhone({ PhoneType: "", PhoneNumber: "" });
      setShowModal(false); // Cerrar el modal después de crear el teléfono
    } catch (error) {
      console.error("Error creating phone", error);
    }
  };

  const handleUpdateCustomerPhone = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7028/api/customers/${customerId}/phones/${selectedCustomerPhoneId}`,
        newCustomerPhone
      );
      const updatedPhones = customersPhone.map((phone) =>
        phone.customerPhoneID === selectedCustomerPhoneId
          ? response.data
          : phone
      );
      setCustomersPhone(updatedPhones);
      setShowModal(false); // Cerrar el modal después de actualizar el teléfono
    } catch (error) {
      console.error("Error updating phone", error);
    }
  };

  const handleDeleteCustomerPhone = async (customerPhoneId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/customers/${customerId}/phones/${customerPhoneId}`
      );
      const updatedPhones = customersPhone.filter(
        (phone) => phone.customerPhoneID !== customerPhoneId
      );
      setCustomersPhone(updatedPhones);
    } catch (error) {
      console.error("Error deleting phone:", error);
    }
  };

  const handleShowCreateModal = () => {
    setModalAction("create");
    setShowModal(true);
  };

  const handleShowEditModal = (customerPhoneId) => {
    setModalAction("edit");
    setSelectedCustomerPhoneId(customerPhoneId);
    const selectedCustomerPhone = customersPhone.find(
      (phone) => phone.customerPhoneID === customerPhoneId
    );
    if (selectedCustomerPhone) {
      setNewCustomerPhone({
        PhoneType: selectedCustomerPhone.phoneType || "",
        PhoneNumber: selectedCustomerPhone.phoneNumber || "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCustomerPhone({ PhoneType: "", PhoneNumber: "" });
    setSelectedCustomerPhoneId(null);
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>Tipo de Telefono: {item.phoneType}</Text>
      <Text>Numero Telefonico: {item.phoneNumber}</Text>
      <Button
        title="Actualizar"
        onPress={() => handleShowEditModal(item.customerPhoneID)}
      />
      <Button
        title="Eliminar"
        onPress={() => handleDeleteCustomerPhone(item.customerPhoneID)}
      />
    </View>
  );

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Telefonos del Cliente
      </Text>
      <Button title="Nuevo Teléfono" onPress={handleShowCreateModal} />
      <FlatList
        data={customersPhone}
        renderItem={renderItem}
        keyExtractor={(item) => item.customerPhoneID.toString()}
      />
      <Modal visible={showModal} animationType="slide">
        <View>
          <Text>
            {modalAction === "create"
              ? "Nuevo Teléfono"
              : "Actualizar Teléfono"}
          </Text>
          <TextInput
            placeholder="Tipo de Teléfono"
            value={newCustomerPhone.PhoneType}
            onChangeText={(text) =>
              setNewCustomerPhone({ ...newCustomerPhone, PhoneType: text })
            }
          />
          <TextInput
            placeholder="Número de Teléfono"
            value={newCustomerPhone.PhoneNumber}
            onChangeText={(text) =>
              setNewCustomerPhone({ ...newCustomerPhone, PhoneNumber: text })
            }
          />
          <Button
            title={modalAction === "create" ? "Crear" : "Actualizar"}
            onPress={
              modalAction === "create"
                ? handleCreateCustomerPhone
                : handleUpdateCustomerPhone
            }
          />
          <Button title="Cancelar" onPress={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
};

export default CustomersPhones;
