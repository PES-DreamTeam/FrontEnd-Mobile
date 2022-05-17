import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { List } from "react-native-paper";

function FaqScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="arrow-back-outline"
          onPress={() => navigation.goBack()}
          size={25}
        />
      ),
    });
  });

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <>
      <ScrollView>
        <List.Section title="General">
          <List.Accordion
            title="Qué es EcoRoads?"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="EcoRoads és una aplicación de movilidad personal, que pone a tu disposición información y servicios para facilitar tus viajes usando vehículos eléctricos."
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={5}
            />
          </List.Accordion>
          <List.Accordion
            title="Habrá más servicios dentro de EcoRoads?"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="Sí, EcoRoads és una aplicación que estará en constante crecimiento,
          con el fin de poder ofrecer en todo momento el mejor servicio posible"
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={3}
            />
          </List.Accordion>
          <List.Accordion
            title="Tiene algun coste utilizar EcoRoads?"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="La descarga y el uso de la aplicación és completamente gratuito."
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={3}
            />
          </List.Accordion>
          <List.Accordion
            title="Puedo personalizar el mapa?"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="Sí, puedes filtrar fácilmente en el mapa la información de los puntos de carga que quieras consultar en todo momento.
              Además puedes añadir estaciones a tu sección de favoritos y filtrar el mapa en base a estos "
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={5}
            />
          </List.Accordion>
          <List.Accordion
            title="Qué hago si tengo una incidencia técnica"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="Si se trata de una incidencia técnica relacionada con algún punto de carga, 
          puedes acceder al modal de información adicional de esa estación para reportar directamente el problema que tengas."
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={4}
            />

            <List.Item
              title="Si se trata de una incidencia técnica de la aplicación, 
          puedes acceder a la sección de reportes de la aplicación, situada en la barra de navegación lateral."
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={4}
            />
          </List.Accordion>
          <List.Accordion
            title="Puedo personalizar el mapa?"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="Sí, puedes filtrar fácilmente en el mapa la información de los puntos de carga que quieras consultar en todo momento.
           Además puedes guardar estaciones en favoritos."
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={5}
            />
          </List.Accordion>
        </List.Section>
        <List.Section title="Registro y cuenta">
          <List.Accordion
            title="Es necesario registarse para utilizar EcoRoads?"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="Sin una cuenta de usuario no podrás acceder a las funcionalidades de EcoRoads, 
          por lo tanto es imprescindible que te registres."
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={5}
            />
          </List.Accordion>
          <List.Accordion
            title="Están seguros mis datos de vehículos en el sistema?"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="Sí, toda la información está encriptada y cumple con los estándares de seguridad más exigentes"
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={5}
            />
          </List.Accordion>
          <List.Accordion
            title="Qué tengo que hacer si quiero dar de baja mi cuenta de EcoRoads?"
            titleStyle={{ fontSize: 15 }}
            titleNumberOfLines={2}
          >
            <List.Item
              title="Lo puedes hacer desde la app, en la sección de configuración, en la barra de navegación lateral.
          Pulsando en el boton de 'Eliminar Cuenta', toda tu información se eliminará de la base de datos de EcoRoads. "
              titleStyle={{ fontSize: 13, textAlign: "justify" }}
              titleNumberOfLines={5}
            />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </>
  );
}

export default FaqScreen;
