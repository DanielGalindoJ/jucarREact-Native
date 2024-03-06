import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "react-native-gesture-handler";

const ProvidersPhone = ({ providerId }) => {
  const [providersPhone, setProvidersPhone] = useState([]);
  const [newProviderPhone, setNewProviderPhone] = useState({
    PhoneType: "",
    PhoneNumber: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [selectedProviderPhoneId, setSelectedProviderPhoneId] = useState("");

  useEffect(() => {
    const fetchProvidersPhone = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/providers/${providerId}/phones`
        );
        setProvidersPhone(response.data);
      } catch (error) {
        console.error("Error fetching ProvidersPhone");
      }
    };

    fetchProvidersPhone();
  }, [providerId]);

  const handleCreateProviderPhone = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/providers/${providerId}/phones`,
        newProviderPhone
      );

      setProvidersPhone([response.data, ...providersPhone]);

      setNewProviderPhone({
        PhoneType: "",
        PhoneNumber: "",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error creating Phone");
    }
  };

  // Other functions remain the same

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Autupartes JUCAR</Text>
      <Text>Telefono Provedores</Text>

      <Pressable onPress={handleShowCreateModal}>
        <Text>Nuevo Telefono</Text>
      </Pressable>
      <Pressable onPress={handleGoBack}>
        <Text>Volver</Text>
      </Pressable>

      <FlatList
        data={providersPhone}
        renderItem={({ item }) => (
          <View>
            <Text>{item.PhoneType}</Text>
            <Text>{item.PhoneNumber}</Text>
            <Pressable
              onPress={() => handleShowEditModal(item.providerPhoneId)}
            >
              <Text>Actualizar</Text>
            </Pressable>
            <Pressable
              onPress={() => handleDeleteProviderPhone(item.providerPhoneId)}
            >
              <Text>Eliminar</Text>
            </Pressable>
            <Pressable
              onPress={() => handleShowDetailModal(item.providerPhoneId)}
            >
              <Text>Ver Detalles</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.providerPhoneId}
      />

      <Modal visible={showModal} animationType="slide">
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>
            {modalAction === "create"
              ? "Nuevo Telefono"
              : "Actualizar Telefono"}
          </Text>
          {/* Form inputs go here */}
        </View>
      </Modal>
    </View>
  );
};

export default ProvidersPhone;
