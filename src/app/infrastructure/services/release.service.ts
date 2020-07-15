import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReleaseService {
    // ToDo: read this version from app.version.ts
    public RELEASE_VERSION = '1.0.0';
    releases: { title: string; description: string; details: string }[] = [
        {
            description: 'This is release V 1.0.0',
            details: 'This is the first Release.',
            title: '1.0.0'
        }
    ];
}
