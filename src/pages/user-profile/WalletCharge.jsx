import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import LanguageInput from "../../utils/LanguageInput";
import { WalletChargeService } from "../../redux/API/users/usersSlice";
import { InputNumber } from "primereact/inputnumber";

const WalletCharge = (props) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { btnLoading } = useSelector((state) => state.users);
  const [amount, setAmout] = useState();
  const ChargeHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("amount", amount);
    let info = { id: props.id, obj: obj };
    dispatch(WalletChargeService(info)).then((res) => {
      console.log(res);
      showSuccess(res.payload.status, toast);
    });
  };
  return (
    <form className="container" onSubmit={ChargeHandler}>
      <Toast ref={toast} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mb-3 text-right">المبلغ المراد شحنه</h6>
          <InputNumber
            required
            style={{ width: "100%" }}
            placeholder="Price"
            onValueChange={(e) => setAmout(e.value)}
          />
        </div>
      </div>
      <span className="actions">
        <Button
          label="شحن"
          icon="pi pi-check"
          type="submit"
          raised
          loading={btnLoading}
        />
        <Button
          label="إلغاء"
          icon="pi pi-times"
          severity="danger"
          type="button"
          raised
          onClick={() => props.visibleState(false)}
        />
      </span>
    </form>
  );
};

export default WalletCharge;
