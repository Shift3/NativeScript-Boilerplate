import { ReleaseService } from "../app/services/release.service";

describe('Release notes: ', function () {
	var releaseService: ReleaseService = new ReleaseService();
	var data: string;
	var isReleaseFileExist: boolean;

	it("Release notes is exist.", function () {
		isReleaseFileExist = releaseService.checkReleaseFileExist();
		expect(isReleaseFileExist).equal(true);
	});

	it("Read most recent release notes.", function () {
		if (!!isReleaseFileExist) {
			data = releaseService.readReleaseFile()
			expect(data).not.equal(null);
			expect(data).not.equal(undefined);
			expect(data).not.equal("");
		}
	});

	it("Notes lines either end or not end with dot.", function () {
		if (!!data) {
			var isLinesEndConsistent = releaseService.isLinesEndConsistent(data);
			expect(isLinesEndConsistent).equal(true);
		}
	});

	it("Notes lines start with upper case.", function () {
		if (!!data) {
			var isNotesStartWithUpperCase = releaseService.isNotesStartWithUpperCase(data);
			expect(isNotesStartWithUpperCase).equal(true);
		}
	});

	it("Notes lines not start with space.", function () {
		if (!!data) {
			var isNotesStartWithSpace = releaseService.isNotesStartWithSpace(data);
			expect(isNotesStartWithSpace).equal(false);
		}
	});

	it("Notes lines has not long space.", function () {
		if (!!data) {
			var isNotesHasLongSpace = releaseService.isNotesHasLongSpace(data);
			expect(isNotesHasLongSpace).equal(false);
		}
	});

	describe('(Android Platform)', function () {
		it("Less than 500 characters.", function () {
			if (!!data) {
				expect(data.length).lessThan(501);
			}
		});

		it("Not Include IOS, APPLE keyword.", function () {
			if (!!data) {
				expect(data.toUpperCase()).not.contain("IOS").not.contain("APPLE");
			}
		});
	});

	describe('(IOS Platform)', function () {
		it("Not Include Android, Amazon, Blackberry or Windows keyword.", function () {
			if (!!data) {
				expect(data.toUpperCase()).not.contains("ANDROID").not.contain("GOOGLE")
				.not.contains("AMAZON").not.contain("BLACKBERRY").not.contain("WINDOWS");
			}
		});

		it("Not Include ALPHA, BETA or TESTING keyword.", function () {
			if (!!data) {
				expect(data.toUpperCase()).not.contains("ALPHA").not.contain("BETA")
				.not.contains("TESTING");
			}
		});

		it("Not Include coming soon, coming shortly, with the next release, arriving soon keyword.", function () {
			if (!!data) {
				expect(data.toUpperCase()).not.contains("COMING SOON").not.contain("COMING SHORTLY")
				.not.contains("WITH THE NEXT RELEASE").not.contain("ARRIVING SOON");
			}
		});

		it("Not Include Lorem Ipsum keyword.", function () {
			if (!!data) {
				expect(data.toUpperCase()).not.contains("LOREM IPSUM");
			}
		});
	});
});