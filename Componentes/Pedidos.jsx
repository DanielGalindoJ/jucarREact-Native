import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Modal,
  Picker,
  TouchableOpacity,
  Image,
} from "react-native";
import basura from "../assets/imgs/basura.png";
import x from "../assets/imgs/error.png";
import agregar from "../assets/imgs/boton-agregar.png";

const Pedidos = ({ customerId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const [newOrder, setNewOrder] = useState({
    OrderDate: formattedDate,
    PaymentStatus: "",
    ShippingAddress: "",
    ShippingStatus: "",
    Observation: "",
    OrderDetails: [
      {
        AutopartId: "",
        Quantity: 0,
      },
    ],
    Contributions: [
      {
        PaymentMethodId: "",
        AmountPaid: 0,
        ContributionDate: formattedDate,
      },
    ],
  });
  const [autoparts, setAutoparts] = useState([]);

  useEffect(() => {
    const fetchAutoparts = async () => {
      try {
        const response = await fetch("https://localhost:7028/api/autoparts");
        const data = await response.json();
        setAutoparts(data);
      } catch (error) {
        console.error("Error fetching autoparts:", error);
      }
    };
    fetchAutoparts();
  }, []);

  const handleCreateOrder = async () => {
    try {
      console.log("Creating order with the next data:", newOrder);
      // Aquí puedes realizar la solicitud POST para crear un pedido
      setIsModalVisible(false);
      alert("¡Éxito! El pedido ha sido creado exitosamente.");
    } catch (error) {
      console.error("Error creating an order:", error);
      alert("Error: Hubo un problema al crear el pedido.");
    }
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...newOrder.OrderDetails];
    updatedDetails[index][field] = value;
    setNewOrder({ ...newOrder, OrderDetails: updatedDetails });
  };

  const addOrderDetail = () => {
    setNewOrder({
      ...newOrder,
      OrderDetails: [...newOrder.OrderDetails, { AutopartId: "", Quantity: 0 }],
    });
  };

  const removeOrderDetail = (index) => {
    const updatedOrderDetails = [...newOrder.OrderDetails];
    updatedOrderDetails.splice(index, 1);
    setNewOrder({ ...newOrder, OrderDetails: updatedOrderDetails });
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        {/* Formulario de creación de pedido */}
        <Button title="Nuevo Pedido" onPress={() => setIsModalVisible(true)} />

        {/* Modal para crear un nuevo pedido */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Crear Nuevo Pedido</Text>
              <TextInput
                style={styles.input}
                value={newOrder.OrderDate}
                onChangeText={(text) =>
                  setNewOrder({ ...newOrder, OrderDate: text })
                }
                placeholder="Fecha del Pedido"
              />
              <TextInput
                style={styles.input}
                value={newOrder.PaymentStatus}
                onChangeText={(text) =>
                  setNewOrder({ ...newOrder, PaymentStatus: text })
                }
                placeholder="Estado de Pago"
              />
              <TextInput
                style={styles.input}
                value={newOrder.ShippingAddress}
                onChangeText={(text) =>
                  setNewOrder({ ...newOrder, ShippingAddress: text })
                }
                placeholder="Dirección de Envío"
              />
              <TextInput
                style={styles.input}
                value={newOrder.ShippingStatus}
                onChangeText={(text) =>
                  setNewOrder({ ...newOrder, ShippingStatus: text })
                }
                placeholder="Estado de Envío"
              />
              <TextInput
                style={styles.input}
                value={newOrder.Observation}
                onChangeText={(text) =>
                  setNewOrder({ ...newOrder, Observation: text })
                }
                placeholder="Observaciones"
              />
              {newOrder.OrderDetails.map((detail, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginBottom: 10 }}
                >
                  <Picker
                    style={[styles.input, { flex: 1, marginRight: 10 }]}
                    selectedValue={detail.AutopartId}
                    onValueChange={(itemValue) =>
                      handleDetailChange(index, "AutopartId", itemValue)
                    }
                  >
                    <Picker.Item label="Selecciona una autoparte" value="" />
                    {autoparts.map((autopart, autopartIndex) => (
                      <Picker.Item
                        key={autopartIndex} // Usando el índice como key único
                        label={autopart.name}
                        value={autopart.id}
                      />
                    ))}
                  </Picker>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={detail.Quantity.toString()}
                    onChangeText={(text) =>
                      handleDetailChange(index, "Quantity", parseInt(text))
                    }
                    placeholder="Cantidad"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.secondaryButton} // Utilizamos el estilo para botones secundarios
                    onPress={() => removeOrderDetail(index)}
                  >
                    <Image source={basura} style={styles.icon} />
                    <Text style={styles.secondaryButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={addOrderDetail}
                style={styles.addButton}
              >
                <Image source={agregar} style={styles.icon} />
                <Text style={styles.secondaryButtonText1}>Agregar Detalle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreateOrder}
                style={styles.primaryButton}
              >
                <Text style={styles.buttonText}>Guardar Pedido</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Image source={x} style={styles.icon} />
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007bff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },

  secondaryButtonText1: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Pedidos;
