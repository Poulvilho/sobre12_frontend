import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Text, View } from '../../components/Themed';
import CustomButton from '../../components/CustomButton';
import CustomDropdown, { CustomItem } from '../../components/CustomDropdown';
import CustomTextInput from '../../components/CustomTextInput';

import { EditDebt, IDebtForm } from './api';
import { styles } from './styles';

type DebtProps = NativeStackScreenProps<RootStackParamList, 'DebtForm'>;

export default function DebtForm({ route }: DebtProps) {
  const { navigate } = useNavigation();
  const { debt } = route.params;

  const handleSubmit = (async (values: IDebtForm) => {
    await EditDebt(values).then(() => {
      navigate('Debt');
    });
  });

  const debtFormik = useFormik<IDebtForm>({
    initialValues: {
      cost: debt.cost,
      user: debt.user,
      value: debt.value.toString(),
      settled: debt.settled,
    },
    validationSchema: Yup.object({
      value: Yup.number().required('Insira um valor!'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar dívida</Text>
      <Text>Custo: {debt.Cost.description}</Text>
      <Text>Endividado: {debt.User.name}</Text>
      <CustomTextInput
        title='Valor'
        fieldName='value'
        formikHelpers={debtFormik}
        width='80%'
        mode='outlined'
        keyboardType='numeric'
      />
      <CustomDropdown
        title='Situação'
        formikHelpers={debtFormik}
        fieldName='settled'
        width='80%'
      >
        <CustomItem key={1} label='Pendente' value='false' />
        <CustomItem key={2} label='Pago' value='true' />
      </CustomDropdown>
      <CustomButton
        title='Salvar'
        onPress={debtFormik.submitForm}
      />
    </View>
  );
}
