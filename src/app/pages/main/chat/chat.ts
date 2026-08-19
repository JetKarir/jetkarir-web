import { Component, signal, computed, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentSend,
  fluentAttach,
  fluentMic,
  fluentVideo,
  fluentCall,
  fluentMoreCircle,
  fluentArrowLeft,
  fluentEmoji,
  fluentChat,
} from '@ng-icons/fluent-ui';
import { MainContacts, ChatContact } from '../../../shared/reusables/main-contacts/main-contacts';

interface ChatMessage {
  id: string;
  text?: string;
  image?: string;
  time: string;
  isMine: boolean;
}

@Component({
  selector: 'app-chat',
  imports: [FormsModule, NgIcon, MainContacts],
  providers: [
    provideIcons({
      fluentSend,
      fluentAttach,
      fluentMic,
      fluentVideo,
      fluentCall,
      fluentMoreCircle,
      fluentArrowLeft,
      fluentEmoji,
      fluentChat,
    }),
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class ChatPage implements AfterViewChecked {
  @ViewChild('msgList') msgList!: ElementRef<HTMLDivElement>;

  private shouldScroll = false;

  messageInputValue = '';
  activeContact = signal<ChatContact | null>(null);

  contacts = signal<ChatContact[]>([
    {
      id: '1',
      name: 'Budi Santoso',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCidk-KQhaj1fh4etTd63JJ_S2Ewjx1aFRI5CinPRqdoJ6RdosOzHO_V-M30JTe-nVwTGsPil8YouCSDw5MVWt0Hy6KxTCMAsJk16g2AWWWrd6VPcS3nuFa5SasHiepZmsBx6krZiGz0sXT2lJcTzm4WYDzOOwtahM8v-BYBlQGHyBo_oYZt27du55NUhZPTpZ7lAiqZOoZNKikyZ7W4IMA-jzVbqPZDMWySaZuEKw03P2_gFqurtAe4g',
      lastMessage: 'Kapan kita bisa meeting...',
      time: '10:35 AM',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Siti Aminah',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA10POdM62k3qVQIxNsQia2z9O-i_A-DCLkVAsCKZOL7UnqPLpvoyovYD1pROMl2sM9AFyLG-NHI08w550k7TU4l1CTE4reOxbOO8lRpgO3cqAnJ3q5qbLSaPAIMWDgctRYN-z8O48D-lTV_7-5WlCeFzova2ZIkjre2DzmAqFUfR9yqac231EjarHpghcc3s8hNWZvUY6q0Hn0GHNswrLajYZRBNHvLL4hsWhbGYVfW2AbRGQUAJj_NQ',
      lastMessage: 'Terima kasih infonya!',
      time: 'Yesterday',
      isOnline: false,
    },
    {
      id: '3',
      name: 'Andi Wijaya',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuClChTS1tjWgW8sB6cnlg7A_4Jc0ifWlK5yVhXoliBWrTdMFgDzNoDYEZunTn18Yar0FBsiKqdotIYWXk4M07R9JxeMQnqxYBmteNnPOC1CLUjhGKkUKyrDDVqYdR74bF1syipAZfUYAhwS6kRc168mat4VsQyoWXgZT6vus8A0AGOzK1TraMJ8sV4vChr4RvCmKJvjNFoyE7S3nc5D4CMhIT395zwyLPgZgj48zihIPpV3yKIB6WaZ2g',
      lastMessage: 'Sudah saya kirim ya filenya.',
      time: 'Monday',
      isOnline: true,
    },
    {
      id: '4',
      name: 'Rina Wijaya',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBDDj7m4XMqcim4VFoQKqSHkb8M3EKoPkNhUZCN97keGXomLD_ZMqizSgkMuCS-49egaFmpvwyPgWT9eMcTC8xJz8kf0lKGiCxWQVdNlLj60DyTZ7H2WcKWfmWY4gew0AtuSO5vkv9Tmr81aGKGoquV6hQQlLZ39Z8G1J4r_gquCfmiVLZEwiiAuDoRLl-BIL6bXJPB6rq21vXUx1pr9rDkEhj52sI3wkyFsppfHJTcPGyHM8iAofCMAw',
      lastMessage: 'Siap, segera saya cek.',
      time: '9:45 AM',
      isOnline: true,
    },
    {
      id: '5',
      name: 'David Chen',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4HOAZl25OeFPO-Tsa5c5PillsT7VrQ9lrjQylVdEimr0dnPJDY1BwOcAp4Pzz5yYsAcaeyd_iebndVdFoe6GG5EM0vOVs-8fcjcSiwLt5N_ZvOZL6mfi_0xV4xFyDu21vq7ZHC3AWrQyEQy1F_4F6GPttKMjqcX1U-BApgF6V78-gH_TirzYLK686dqCUO9vUYYOo-tUCpZrLSs_g6ZTYoW3hT6rV1F7RgiDOJkPGq8pakQPMwLGiLA',
      lastMessage: 'Interview jam berapa?',
      time: '8:20 AM',
      isOnline: false,
    },
    {
      id: '6',
      name: 'Siska Putri',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBR0hLJuCaSBBWIOBnNhbGayYB_x_Z6mu80spqFIrcqbTzpsZPKuFOIaPZiyLjbw3zUxvucoemM--utfEfVBnT1hx9eywS-hVo4YPJC7bqEiVE9ZRZs0bd-RvGXpM02utG3z87wlDX_nHiBYsXb46xZJGgZdlscIKfmO1RV_Qyl8xVlv5SrBrp_8bX6FUDwKkeMROMBeQZX5KUY6W_ZRgmnlUqAJPhdGWaMaMhCSKo_jKuTiJHTg87AIA',
      lastMessage: 'OK, noted.',
      time: 'Yesterday',
      isOnline: true,
    },
    {
      id: '7',
      name: 'Hendra Kurniawan',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuADF6aSvMURhel92-OkPS98WI_dZSiuS4RYQ7DQNL_59KvzCs-AhktvlRQGQ8KF2yhHtLpi4PicnByK_ixl7cviepw3oZFh4L9crMmXnYiomI3bMD-wqk8nRq9qJ_4vaNdENnGA6qvKb-ALjaVDc_uMKV_OhUhPKuk3bBT-BG11QRg_NZbRTMZm2HaeKljJ3y2r6yYLfUcZtWm7YMTfqKgLQssGWhNWu2qEkDuWxZaP3MI8pjcOzbvcxA',
      lastMessage: 'Portofolio sudah terkirim.',
      time: 'Sunday',
      isOnline: false,
    },
    {
      id: 'g1',
      name: 'Frontend Team',
      lastMessage: 'Rafi: The PR is ready for review...',
      time: '11:05 AM',
      isOnline: false,
      isGroup: true,
    },
    {
      id: 'g2',
      name: 'Product Sync',
      lastMessage: 'Meeting moved to 2 PM tomorrow.',
      time: 'Yesterday',
      isOnline: false,
      isGroup: true,
    },
  ]);

  private mockMessages: Record<string, ChatMessage[]> = {
    '1': [
      {
        id: '1',
        text: 'Halo Rafi, apakah kamu sudah melihat update terbaru untuk proyek desain kita?',
        time: '10:30 AM',
        isMine: false,
      },
      {
        id: '2',
        text: 'Sudah Budi! Saya baru saja memeriksanya. Terlihat sangat bagus, terutama bagian navigasinya.',
        time: '10:32 AM',
        isMine: true,
      },
      {
        id: '3',
        text: 'Bagus kalau begitu. Kapan kita bisa meeting untuk membahas feedback dari klien?',
        time: '10:35 AM',
        isMine: false,
      },
      {
        id: '4',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAzvEHJsNTe_i9sUSD1uDbM3dkwvI1iYsFoSKGJ5Su53exR3zH3EcJdabzMnrTFiS8YA6YNF0i0kp4fRfDFmuGhhVCXH-_ga8QkfarLVUBAZFDVMnaL-me6C_xdnCP31Z-MZWdeO7vn-sO-QtZ0AeV58Yj6Smxk7uZcmsJTHkTfu7s_XK7yLU2Ls29Jy0QpHqz1xQM9am6SrLJ9ybCw0fjsYQ3XS4TAFXNE54-YNXspgDma2jkrosTOFA',
        time: '10:38 AM',
        isMine: true,
      },
      {
        id: '5',
        text: 'Wah, detailnya luar biasa! Suka sekali dengan pemilihan warnanya.',
        time: '10:40 AM',
        isMine: false,
      },
    ],
  };

  messages = signal<Record<string, ChatMessage[]>>(this.mockMessages);

  activeMessages = computed(() => {
    const contact = this.activeContact();
    if (!contact) return [];
    return this.messages()[contact.id] ?? [];
  });

  onContactSelected(contact: ChatContact) {
    this.activeContact.set(contact);
    this.shouldScroll = true;
  }

  sendMessage() {
    const text = this.messageInputValue.trim();
    const contact = this.activeContact();
    if (!text || !contact) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };

    this.messages.update((msgs) => ({
      ...msgs,
      [contact.id]: [...(msgs[contact.id] ?? []), newMsg],
    }));

    this.messageInputValue = '';
    this.shouldScroll = true;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScroll && this.msgList?.nativeElement) {
      const el = this.msgList.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.shouldScroll = false;
    }
  }
}
