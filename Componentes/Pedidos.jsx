import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Modal,
  TextInput,
  Text,
  FlatList,
  Picker,
  StyleSheet,
} from "react-native";
import axios from "axios";

const Orders = ({ customerId }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const [orders, setOrders] = useState([]);
  const [autoparts, setAutoparts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    OrderDate: formattedDate,
    PaymentStatus: "",
    ShippingAddress: "",
    ShippingStatus: "",
    Observation: "",
    OrderDetails: [],
    Contributions: [],
  });

  useEffect(() => {
    const fetchAutoparts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/autoparts"
        );
        setAutoparts(response.data);
      } catch (error) {
        console.error("Error fetching autoparts:", error);
      }
    };
    fetchAutoparts();
  }, []);

  const handleCreateOrder = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/customers/${customerId}/orders`,
        newOrder
      );
      setOrders([response.data, ...orders]);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating order:", error);
      console.error("Server error message:", error.response.data);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewOrder({
      OrderDate: formattedDate,
      PaymentStatus: "",
      ShippingAddress: "",
      ShippingStatus: "",
      Observation: "",
      OrderDetails: [],
      Contributions: [],
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>Nombre de la autoparte: {item.AutopartName}</Text>
      <Text>Cantidad: {item.Quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Crear Pedido" onPress={() => setShowModal(true)} />
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.OrderId.toString()}
      />
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Crear Nuevo Pedido</Text>
          <TextInput
            style={styles.input}
            placeholder="Estado de Pago"
            value={newOrder.PaymentStatus}
            onChangeText={(text) =>
              setNewOrder({ ...newOrder, PaymentStatus: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección de Envío"
            value={newOrder.ShippingAddress}
            onChangeText={(text) =>
              setNewOrder({ ...newOrder, ShippingAddress: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Estado de Envío"
            value={newOrder.ShippingStatus}
            onChangeText={(text) =>
              setNewOrder({ ...newOrder, ShippingStatus: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Observación"
            value={newOrder.Observation}
            onChangeText={(text) =>
              setNewOrder({ ...newOrder, Observation: text })
            }
          />
          <View style={styles.orderDetailsContainer}>
            {newOrder.OrderDetails.map((detail, index) => (
              <View
                key={`${detail.AutopartId}-${index}`}
                style={styles.orderDetail}
              >
                <Picker
                  selectedValue={detail.AutopartId}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    const updatedOrderDetails = [...newOrder.OrderDetails];
                    updatedOrderDetails[index].AutopartId = itemValue;
                    setNewOrder({
                      ...newOrder,
                      OrderDetails: updatedOrderDetails,
                    });
                  }}
                >
                  {autoparts.map((autopart) => (
                    <Picker.Item
                      key={autopart.AutopartId}
                      label={autopart.Name}
                      value={autopart.AutopartId}
                    />
                  ))}
                </Picker>
                <TextInput
                  style={[styles.input, styles.quantityInput]}
                  placeholder="Cantidad"
                  value={detail.Quantity.toString()}
                  onChangeText={(text) => {
                    const updatedOrderDetails = [...newOrder.OrderDetails];
                    updatedOrderDetails[index].Quantity = text;
                    setNewOrder({
                      ...newOrder,
                      OrderDetails: updatedOrderDetails,
                    });
                  }}
                />
              </View>
            ))}

            <Button
              title="Agregar Item"
              onPress={() =>
                setNewOrder({
                  ...newOrder,
                  OrderDetails: [
                    ...newOrder.OrderDetails,
                    { AutopartId: "", Quantity: "" },
                  ],
                })
              }
            />
          </View>
          <Button title="Crear" onPress={handleCreateOrder} />
          <Button title="Cancelar" onPress={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  orderDetailsContainer: {
    width: "80%",
    marginBottom: 20,
  },
  orderDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  quantityInput: {
    flex: 1,
  },
  orderItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Orders;
