import React, { useEffect, useMemo } from 'react';
import Card from '../components/Card';
import { useAuthContext } from '../context/AuthContext';
import { formatDate } from '../utils/dataHelpers';

const NotificationsPage = () => {
  const {
    notifications,
    notificationsLoading,
    refreshNotifications,
    markAllNotificationsAsRead,
  } = useAuthContext();

  const unreadNotifications = useMemo(
    () => (notifications || []).filter((notification) => !notification.isRead),
    [notifications]
  );

  const handleMarkAllAsRead = async () => {
    console.log('Mark as Read clicked');
    await markAllNotificationsAsRead();
  };

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  return (
    <section className="max-w-5xl mx-auto p-6 sm:p-10 mt-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-4xl font-bold text-blue-700">Notifications</h1>
        <button
          type="button"
          onClick={handleMarkAllAsRead}
          disabled={unreadNotifications.length === 0 || notificationsLoading}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Mark All as Read
        </button>
      </div>
      <div className="space-y-4">
        {notificationsLoading ? (
          <Card className="bg-white/70 backdrop-blur-xl border border-white/30">
            Loading notifications...
          </Card>
        ) : unreadNotifications.length ? (
          unreadNotifications.map((notification) => (
            <Card key={notification.id} className="bg-white/70 backdrop-blur-xl border border-white/30">
              <p className="font-medium text-gray-900">{notification.message}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">{notification.type || 'INFO'}</p>
              <p className="mt-1 text-sm text-gray-500">{formatDate(notification.createdAt)}</p>
            </Card>
          ))
        ) : (
          <Card className="bg-white/70 backdrop-blur-xl border border-white/30">
            No unread notifications.
          </Card>
        )}
      </div>
    </section>
  );
};

export default NotificationsPage;
