'use client';

import React, { useState } from 'react';

export default function FullFormDemo() {
  const [formData, setFormData] = useState({
    battery: 60,
    bio: '',
    country: '',
    food: '',
    gender: '',
    price: 100,
    quantity: 1,
    uploadProgress: 0.7,
    username: ''
  });

  const total = formData.quantity * formData.price;

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, type, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert(`表单已提交：\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <form
      style={{ margin: '0 auto', maxWidth: 600, padding: 16 }}
      onSubmit={handleSubmit}
    >
      {/* label + input */}
      <label>
        用户名：
        <input
          required
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
      </label>

      <br />
      <br />

      {/* textarea */}
      <label>
        个人简介：
        <br />
        <textarea
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
        />
      </label>

      <br />
      <br />

      {/* select + option + optgroup */}
      <label>
        国家：
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <optgroup label="亚洲">
            <option value="cn">中国</option>
            <option value="jp">日本</option>
          </optgroup>
          <optgroup label="欧洲">
            <option value="de">德国</option>
            <option value="fr">法国</option>
          </optgroup>
        </select>
      </label>

      <br />
      <br />

      {/* datalist */}
      <label>
        喜欢的食物：
        <input
          list="food-list"
          name="food"
          value={formData.food}
          onChange={handleChange}
        />
        <datalist id="food-list">
          <option value="披萨" />
          <option value="寿司" />
          <option value="汉堡" />
        </datalist>
      </label>

      <br />
      <br />

      {/* meter */}
      <label>
        电量：
        <meter
          max={100}
          min={0}
          value={formData.battery}
        >
          {formData.battery}%
        </meter>
      </label>

      <br />
      <br />

      {/* progress */}
      <label>
        上传进度：
        <progress
          max={1}
          value={formData.uploadProgress}
        >
          {formData.uploadProgress * 100}%
        </progress>
      </label>

      <br />
      <br />

      {/* output */}
      <label>
        单价：
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        × 数量：
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
        />
        = 总计：
        <output name="total">{total}</output>
      </label>

      <br />
      <br />

      {/* fieldset + legend */}
      <fieldset>
        <legend>性别</legend>
        <label>
          <input
            checked={formData.gender === 'male'}
            name="gender"
            type="date"
            value="male"
            onChange={handleChange}
          />
          男
        </label>
        <label style={{ marginLeft: 20 }}>
          <input
            checked={formData.gender === 'female'}
            name="gender"
            type="radio"
            value="female"
            onChange={handleChange}
          />
          女
        </label>
      </fieldset>

      <br />

      {/* button */}
      <button type="submit">提交</button>
    </form>
  );
}
