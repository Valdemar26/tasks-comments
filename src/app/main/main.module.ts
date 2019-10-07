import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ItemsComponent } from './components/items/items.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  declarations: [
    MainComponent,
    ItemsComponent,
    CommentsComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AuthModule
  ]
})
export class MainModule { }
