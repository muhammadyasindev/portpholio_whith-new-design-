import React, { useState } from 'react';
import { updateMessage, deleteMessage } from '../../../api';
import { useToast } from '../../ui/Toast';
import Modal from '../../ui/Modal';
import ConfirmDialog from '../../ui/ConfirmDialog';
import {
  Mail,
  Star,
  Trash2,
  CheckCircle,
  Eye,
  Reply,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';

const MessagesModule = ({ messages, onUpdated }) => {
  const toast = useToast();
  const [filter, setFilter] = useState('all');
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [msgToDelete, setMsgToDelete] = useState(null);

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return m.status === 'unread';
    if (filter === 'starred') return m.isStarred;
    return true;
  });

  const handleView = async (msg) => {
    setSelectedMsg(msg);
    setModalOpen(true);

    if (msg.status === 'unread') {
      try {
        await updateMessage(msg._id, { status: 'read' });
        if (onUpdated) onUpdated();
      } catch (err) {
      }
    }
  };

  const handleToggleStar = async (msg, e) => {
    e.stopPropagation();
    try {
      await updateMessage(msg._id, { isStarred: !msg.isStarred });
      toast.success(msg.isStarred ? 'Unstarred' : 'Starred inquiry');
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to update message.');
    }
  };

  const handleToggleRead = async (msg, e) => {
    e.stopPropagation();
    const newStatus = msg.status === 'read' ? 'unread' : 'read';
    try {
      await updateMessage(msg._id, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!msgToDelete) return;
    try {
      await deleteMessage(msgToDelete._id);
      toast.success('Message deleted.');
      if (modalOpen && selectedMsg?._id === msgToDelete._id) {
        setModalOpen(false);
      }
      if (onUpdated) onUpdated();
    } catch (err) {
      toast.error('Failed to delete message.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-primary">Inbound Inquiries & Messages</h3>
          <p className="text-xs text-secondary">
            All contact messages submitted through your public portfolio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {['all', 'unread', 'starred'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-primary text-warmBeige shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {f} ({messages.filter((m) => (f === 'all' ? true : f === 'unread' ? m.status === 'unread' : m.isStarred)).length})
            </button>
          ))}
        </div>
      </div>

      
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400 text-xs font-mono">
            No messages matching the "{filter}" filter.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {filtered.map((msg) => {
              const isUnread = msg.status === 'unread';
              return (
                <div
                  key={msg._id}
                  onClick={() => handleView(msg)}
                  className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isUnread ? 'bg-amber-50/40 hover:bg-amber-50/70 font-semibold' : 'hover:bg-stone-50/60'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                    <button
                      onClick={(e) => handleToggleStar(msg, e)}
                      className={`p-1 rounded text-stone-300 hover:text-amber-500 transition-colors ${
                        msg.isStarred ? 'text-amber-400' : ''
                      }`}
                    >
                      <Star className={`w-4 h-4 ${msg.isStarred ? 'fill-amber-400' : ''}`} />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-primary">{msg.name}</span>
                        <span className="text-xs text-stone-400 font-mono">
                          &lt;{msg.email}&gt;
                        </span>
                        {isUnread && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent text-white font-bold">
                            NEW
                          </span>
                        )}
                        {msg.service && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-700">
                            {msg.service}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-600 truncate max-w-xl">
                        <strong className="text-primary font-medium">{msg.subject}:</strong>{' '}
                        {msg.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="text-[11px] font-mono text-stone-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={(e) => handleToggleRead(msg, e)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-primary hover:bg-stone-100"
                      title={isUnread ? 'Mark as read' : 'Mark as unread'}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMsgToDelete(msg);
                        setDeleteConfirmOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedMsg ? `Inquiry from ${selectedMsg.name}` : 'Message Details'}
        maxWidth="max-w-2xl"
      >
        {selectedMsg && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-stone-400 uppercase">From:</span>
                <span className="font-bold text-primary">{selectedMsg.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-stone-400 uppercase">Email:</span>
                <a
                  href={`mailto:${selectedMsg.email}`}
                  className="font-medium text-accent hover:underline"
                >
                  {selectedMsg.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-stone-400 uppercase">Service Requested:</span>
                <span className="font-mono text-stone-700">{selectedMsg.service}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-stone-400 uppercase">Date Received:</span>
                <span className="font-mono text-stone-600">
                  {new Date(selectedMsg.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-secondary font-semibold mb-2">
                Subject: {selectedMsg.subject}
              </h4>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                {selectedMsg.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  setMsgToDelete(selectedMsg);
                  setDeleteConfirmOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
              >
                Delete Message
              </button>

              <a
                href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject || 'Your Inquiry')}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold shadow-sm transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply via Email Client</span>
              </a>
            </div>
          </div>
        )}
      </Modal>

      
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Inquiry Message"
        message="Are you sure you want to permanently delete this contact message?"
      />
    </div>
  );
};

export default MessagesModule;
