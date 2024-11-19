// src/hooks/useOrders.ts
import { useState, useEffect } from 'react';
import { OrderType } from '../types';

export const useOrders = (userId: number) => {
  const [orders, setOrders] = useState<OrderType[]>(() => {
    const savedOrders = localStorage.getItem('userOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('userOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<OrderType, 'id' | 'date' | 'userId'>) => {
    const newOrder: OrderType = {
      ...orderData,
      id: Date.now(),
      userId,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrder;
  };

  const deleteOrder = (orderId: number) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  // Filter orders by userId
  const userOrders = orders.filter(order => order.userId === userId);

  return { orders: userOrders, addOrder, deleteOrder };
};