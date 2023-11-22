import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-one-on-one',
  templateUrl: './one-on-one.component.html',
  styleUrls: ['./one-on-one.component.scss'],
})
export class OneOnOneComponent {
  privateChatData = {
    privateChatId: '',
    friendUsername: '',
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const privateChatId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.privateChatData.privateChatId = privateChatId;

    this.privateChatData.friendUsername = privateChatId.slice(
      privateChatId.search('w-') + 2
    );
  }
}
