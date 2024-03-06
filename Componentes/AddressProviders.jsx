import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Modal, FlatList } from "react-native";
import axios from "axios";

const Address = ({ providerID }) => {
  const [addressProviders, setAddressProviders] = useState([]);
  const [newAddressProvider, setNewAddressProvider] = useState({
    Address: "",
    AddressType: "",
    NeighborhoodId: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [selectedAddressProviderId, setSelectedAddressProviderId] =
    useState("");

  useEffect(() => {
    const fetchAddressProviders = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/providers/${providerID}/addresses`
        );
        setAddressProviders(response.data);
      } catch (error) {
        console.error("error fetching AddressProvider");
      }
    };
    fetchAddressProviders();
  }, [providerID]);

  const handleCreateAddressProvider = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/providers/${providerID}/addresses`,
        newAddressProvider
      );
      setAddressProviders([response.data, ...addressProviders]);
      setNewAddressProvider({
        Address: "",
        AddressType: "",
        NeighborhoodId: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating Address");
    }
  };

  const handleUpdateAddressProvider = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/providers/${providerID}/addresses/${selectedAddressProviderId}`,
        newAddressProvider
      );
      const response = await axios.get(
        `https://localhost:7028/api/providers/${providerID}/addresses`
      );
      const updatedAddressProviders = response.data;
      setAddressProviders(updatedAddressProviders);
      setNewAddressProvider({
        Address: "",
        AddressType: "",
        NeighborhoodId: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating Address");
    }
  };

  const handleDeleteAddressProvider = async (addressProviderId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/providers/${providerID}/addresses/${addressProviderId}`
      );
      const updatedAddressProviders = addressProviders.filter(
        (addressProvider) =>
          addressProvider.addressProviderId !== addressProviderId
      );
      setAddressProviders(updatedAddressProviders);
    } catch (error) {
      console.error("Error deleting Address");
    }
  };

  const handleShowModal = (action, addressProviderId) => {
    setModalAction(action);
    setSelectedAddressProviderId(addressProviderId);
    setShowModal(true);
    if (action === "edit" || action === "detail") {
      const selectedAddressProvider = addressProviders.find(
        (addressProvider) =>
          addressProvider.addressProviderId === addressProviderId
      );
      if (selectedAddressProvider) {
        setNewAddressProvider({
          Address: selectedAddressProvider.Address || "",
          AddressType: selectedAddressProvider.AddressType || "",
          NeighborhoodId: selectedAddressProvider.NeighborhoodId || "",
        });
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAddressProvider({
      Address: "",
      AddressType: "",
      NeighborhoodId: "",
    });
    setSelectedAddressProviderId("");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Direcciones Provedores</Text>
      <Button
        title="Nueva Dirección"
        onPress={() => handleShowModal("create")}
      />
      <FlatList
        data={addressProviders}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Address}</Text>
            <Text>{item.AddressType}</Text>
            <Text>{item.NeighborhoodId}</Text>
            <Button
              title="Actualizar"
              onPress={() => handleShowModal("edit", item.addressProviderId)}
            />
            <Button
              title="Eliminar"
              onPress={() =>
                handleDeleteAddressProvider(item.addressProviderId)
              }
            />
            <Button
              title="Ver Detalle"
              onPress={() => handleShowModal("detail", item.addressProviderId)}
            />
          </View>
        )}
        keyExtractor={(item) => item.addressProviderId.toString()}
      />
      <Modal visible={showModal} animationType="slide">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            {modalAction === "create"
              ? "Nueva dirección"
              : modalAction === "edit"
              ? "Actualizar dirección"
              : "Detalle de dirección"}
          </Text>
          <TextInput
            placeholder="Dirección"
            value={newAddressProvider.Address}
            onChangeText={(text) =>
              setNewAddressProvider({ ...newAddressProvider, Address: text })
            }
          />
          <TextInput
            placeholder="Tipo de dirección"
            value={newAddressProvider.AddressType}
            onChangeText={(text) =>
              setNewAddressProvider({
                ...newAddressProvider,
                AddressType: text,
              })
            }
          />
          <TextInput
            placeholder="ID de Barrio"
            value={newAddressProvider.NeighborhoodId}
            onChangeText={(text) =>
              setNewAddressProvider({
                ...newAddressProvider,
                NeighborhoodId: text,
              })
            }
          />
          <Button title="Cancelar" onPress={handleCloseModal} />
          {modalAction !== "detail" && (
            <Button
              title={modalAction === "create" ? "Crear" : "Actualizar"}
              onPress={
                modalAction === "create"
                  ? handleCreateAddressProvider
                  : handleUpdateAddressProvider
              }
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Address;
