import React from "react";

const Evaluation = ({ evaluation, index }) => {
  const dateParsed = new Date(evaluation.createdAt);
  const day = dateParsed.getDate();
  const month = dateParsed.getMonth();
  const year = dateParsed.getFullYear();
  const minutes = dateParsed.getMinutes();
  const hours = dateParsed.getHours();
  const fecha = `${day}/${month}/${year}`;
  const fechaTiempo = ` ${hours}:${minutes}`;

  const selectTratamient = (diagnostic) => {
    switch (diagnostic) {
      case "Paperas":
        return (
          <ul>
            <li>Aplicar compresas frías o calientes en la zona del cuello.</li>
            <li>
              Tomar paracetamol (Tylenol) para aliviar el dolor. (No le dé ácido
              acetilsalicílico a los niños con una enfermedad viral debido al
              riesgo del síndrome de Reye).
            </li>
            <li>Tomar líquidos adicionales.</li>
            <li>Comer alimentos blandos.</li>
            <li>Hacer gárgaras con agua tibia con sal.</li>
          </ul>
        );
        break;
      case "Varicela":
        return (
          <ul>
            <li>
              Lociones para aliviar la picazón, paracetamol para la fiebre y el
              fármaco antivírico aciclovir.
            </li>
            <li>
              El aciclovir reduce el número de días de fiebre de la varicela en
              niños sin otra enfermedad.
            </li>
            <li>
              La hidratación es muy importante, dado las pérdidas que se
              producen por los vómitos y diarreas y usualmente los médicos
              prescriben ingerir líquidos como: agua, caldos, jugos de frutas,
              sales de rehidratación.
            </li>
          </ul>
        );
        break;
      case "Anemia":
        return (
          <ul>
            <li>
              Tratamiento para detener el sangrado. Si la pérdida de sangre está
              causando anemia por deficiencia de hierro, el tratamiento
              dependerá de la causa del sangrado.
            </li>
            <li>
              Por ejemplo, si usted tiene una úlcera sangrante, el médico puede
              recetarle antibióticos y otras medicinas para tratar la úlcera.
            </li>
          </ul>
        );
        break;
      case "Resfriado":
        return (
          <ul>
            <li>
              El tratamiento de los síntomas no hará desaparecer el resfriado,
              pero le ayudará a sentirse mejor.
            </li>
            <li>
              Los antibióticos casi nunca se necesitan para tratar un resfriado
              común.
            </li>
            <li>
              El paracetamol (Tylenol) y el ibuprofeno (Advil, Motrin) ayudan a
              disminuir la fiebre y aliviar los dolores musculares.
            </li>
          </ul>
        );
        break;
      case "Influenza":
        return (
          <ul>
            <li>
              Se recomiendan tres medicamentos antivirales para la influenza
              aprobados por la Administración de Alimentos y Medicamentos de EE.
              UU. (FDA) para usar en los Estados Unidos durante la temporada de
              influenza 2015-2016: oseltamivir (Tamiflu®) por vía oral,
              zanamivir (Relenza®) para inhalar y peramivir (Rapivab®) por vía
              intravenosa.
            </li>
            <li>
              Estos medicamentos son antivirales químicamente relacionados,
              conocidos como inhibidores de neuraminidasa que actúan contra los
              virus de la influenza A y B.
            </li>
          </ul>
        );
        break;
      case "Fatiga":
        return (
          <ul>
            <li>
              Tener horarios de sueño regulares, una dieta saludable y realizar
              ejercicio físico con frecuencia puede ayudar a reducir la fatiga.
            </li>
            <li>
              Consumir menos cafeína durante el día y evitar la cafeína de noche
              también puede ayudar.
            </li>
          </ul>
        );
        break;
      case "Infeccion de estomago":
        return (
          <ul>
            <li>
              Reposo en casa, si no tienen ninguna otra indicación dada por el
              personal de salud, hasta recuperarse de los síntomas antes
              mencionados y otros que pudiéramos haber omitido.
            </li>
            <li>El descanso es parte de la recuperación.</li>
            <li>
              La hidratación es muy importante, dado las pérdidas que se
              producen por los vómitos y diarreas y usualmente los médicos
              prescriben ingerir líquidos como: agua, caldos, jugos de frutas,
              sales de rehidratación.
            </li>
          </ul>
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="evaluation">
      {index === 0 && <p className="alert alert-success">Ultimo diagnostico</p>}
      <h2 className="evaluation__title">Resultado: {evaluation.diagnostic}</h2>
      <p className="evaluation__date">
        <span>Dia de evaluación: {fecha}</span>
        <span>Hora: {fechaTiempo}</span>
      </p>
      <div>
        <h5>Tratamiento recomendado:</h5>
        {selectTratamient(evaluation.diagnostic)}
      </div>
    </div>
  );
};

export default Evaluation;
