import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    private readonly allBreakpoints: string[] = Object.values(Breakpoints);

    public constructor(private breakpointObserver: BreakpointObserver) { }

    public hasBreakpointChanged(
        breakpoints: string | string[] = null
    ): Observable<boolean> {
        const usedBreakpoints = breakpoints ? breakpoints : this.allBreakpoints;

        return this.breakpointObserver
            .observe(usedBreakpoints)
            .pipe(map(breakpointState => breakpointState.matches));
    }

    public isExtraSmallDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.XSmall);
    }

    public isSmallDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.Small);
    }

    public isMediumDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.Medium);
    }

    public isLargeDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.Large);
    }

    public isExtraLargeDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.XLarge);
    }
}
