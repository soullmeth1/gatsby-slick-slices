import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format;

const PriceInput = React.forwardRef((props, ref) => {
  const { value, onChange, type } = props;
  const { name, title, description } = type;
  //   console.log(props);

  return (
    <div>
      <h2>
        {title} - {formatMoney((value || 0) / 100)}
      </h2>
      <p>{description}</p>
      <input
        type={name}
        value={value}
        onChange={(e) => onChange(createPatchFrom(e.target.value))}
        ref={ref}
      />
    </div>
  );
});

export default PriceInput;
