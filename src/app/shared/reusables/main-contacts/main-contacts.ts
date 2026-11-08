import { Component, input, output, signal, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentSearch,
  fluentEdit,
  fluentPeople,
  fluentChatLock,
  fluentMoreVertical,
} from '@ng-icons/fluent-ui';

export interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  isGroup?: boolean;
  unread?: number;
}

export type ChatFilter = 'all' | 'unread' | 'groups';

@Component({
  selector: 'app-main-contacts',
  imports: [NgIcon],
  providers: [provideIcons({ fluentSearch, fluentEdit, fluentPeople, fluentChatLock, fluentMoreVertical })],
  templateUrl: './main-contacts.html',
  styleUrl: './main-contacts.scss',
})
export class MainContacts {
  contacts = input<ChatContact[]>([]);
  activeId = input<string | null>(null);
  contactSelected = output<ChatContact>();

  searchQuery = signal('');
  activeFilter = signal<ChatFilter>('all');

  filteredContacts = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const filter = this.activeFilter();
    let list = this.contacts();
    if (filter === 'unread') list = list.filter((c) => (c.unread ?? 0) > 0);
    if (filter === 'groups') list = list.filter((c) => c.isGroup);
    if (q) list = list.filter((c) => c.name.toLowerCase().includes(q));
    return list;
  });

  select(contact: ChatContact) {
    this.contactSelected.emit(contact);
  }
}
