import { Component, input, output, signal, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentSearch, fluentEdit, fluentPeople } from '@ng-icons/fluent-ui';

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

@Component({
  selector: 'app-main-contacts',
  imports: [NgIcon],
  providers: [provideIcons({ fluentSearch, fluentEdit, fluentPeople })],
  templateUrl: './main-contacts.html',
  styleUrl: './main-contacts.scss',
})
export class MainContacts {
  contacts = input<ChatContact[]>([]);
  activeId = input<string | null>(null);
  contactSelected = output<ChatContact>();

  searchQuery = signal('');

  filteredContacts = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.contacts();
    return this.contacts().filter((c) => c.name.toLowerCase().includes(q));
  });

  select(contact: ChatContact) {
    this.contactSelected.emit(contact);
  }
}
